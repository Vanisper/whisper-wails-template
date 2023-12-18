import type { RouteLocationNormalized } from 'vue-router';
import { defineStore } from 'pinia';
import {
    DEFAULT_ROUTE,
    DEFAULT_ROUTE_NAME,
} from '@/router/constants';
import { isString } from '@/utils/is';
import { TabBarState, TagProps } from './types';
import PageEnum from '@/enum/page';

const formatTag = (route: RouteLocationNormalized): TagProps => {
    const { name, meta, fullPath, query } = route;
    
    return {
        title: meta.title || name as string || '',
        locale: meta.locale,
        name: String(name || ''),
        fullPath,
        query,
        ignoreCache: meta.ignoreCache,
    };
};

const BAN_LIST: string[] = [PageEnum.REDIRECT_NAME];

const useTabBarStore = defineStore('tabBar', {
    persist: true,
    state: (): TabBarState => ({
        cacheTabList: Array.from(new Set([DEFAULT_ROUTE_NAME])),
        tagList: [DEFAULT_ROUTE],
    }),

    getters: {
        getTabList(): TagProps[] {
            return this.tagList;
        },
        getCacheList(): string[] {
            return Array.from(this.cacheTabList);
        },
    },

    actions: {
        updateTabList(route: RouteLocationNormalized) {
            const currFullPath = route.fullPath;
            const routeMatched = route.matched;
            const targetRoute = routeMatched.filter((item) => item.path === currFullPath);
            if (targetRoute.length > 0) {
                // 将匹配到的meta信息 替换route中的meta信息 防止父级meta污染
                route.meta = targetRoute[0].meta;
            }
            
            if (BAN_LIST.includes(route.name as string)) return;
            
            const tag = formatTag(route);
            this.tagList.push(tag);
            if (!route.meta.ignoreCache) {
                this.addCache(route.name as string);
            }
        },
        deleteTag(idx: number, tag: TagProps) {
            this.tagList.splice(idx, 1);
            this.deleteCache(tag);
        },
        addCache(name: string) {
            if (isString(name) && name !== '' && !this.cacheTabList.includes(name)) this.cacheTabList.push(name);
        },
        deleteCache(tag: TagProps) {
            this.deleteCacheByName(tag.name);
        },
        deleteCacheByName(name: string) {
            const index = this.cacheTabList.findIndex((el) => el === name);
            if (index !== -1) this.cacheTabList.splice(index, 1);
        },
        freshTabList(tags: TagProps[]) {
            this.tagList = tags;
            this.cacheTabList = [];
            // 要先判断ignoreCache
            this.tagList
                .filter((el) => !el.ignoreCache)
                .map((el) => el.name)
                .forEach((x) => this.addCache(x));
        },
        resetTabList() {
            this.tagList = [DEFAULT_ROUTE];
            this.cacheTabList = [];
            this.addCache(DEFAULT_ROUTE_NAME);
        },
    },
});

export default useTabBarStore;
