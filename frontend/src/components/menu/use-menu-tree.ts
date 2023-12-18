import { computed } from 'vue';
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import usePermission from '@/hooks/permission';
import { useAppStore } from '@/store';
import appClientMenus from '@/router/app-menus';
import { AppRouteRecordRaw } from '@/router/routes/types';
import { cloneDeep } from 'lodash';

export default function useMenuTree() {
    const permission = usePermission();
    const appStore = useAppStore();
    const appRoute = computed(() => {
        if (appStore.menuFromServer) {
            return appStore.appAsyncMenus;
        }
        return appClientMenus;
    });
    const menuTree = computed<RouteRecordRaw[]>(() => {
        const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[];
        copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
            return (a.meta.order || 0) - (b.meta.order || 0);
        });

        return menuTreeTravel(copyRouter, 0);
    });

    function menuTreeTravel(_routes: RouteRecordRaw[], layer: number) {
        if (!_routes) return null;
        const collector: any = _routes.map((element) => {
            // no access
            if (!permission.accessRouter(element)) {
                return null;
            }
    
            // hideInMenu hideMenu
            if ((element as AppRouteRecordRaw).hidden || element.meta?.hideInMenu || element.meta?.hideMenu) {
                return null;
            }
            
            if (element.meta?.single && element.children?.length) {
                return {
                    ...element,
                    name: element.children[0].name,
                    // children: element.meta.hideChildrenInMenu ? [] : element.children,
                    children: [] // single单菜单模式下 不显示子菜单
                };
            }
            // leaf node
            if (element.meta?.hideChildrenInMenu || !element.children || !element.children.length) {
                element.children = [];
                return element;
            }
    
            // route filter hideInMenu true
            element.children = element.children.filter(
                (x) => x.meta?.hideInMenu !== true || x.meta?.hideMenu !== true
            );
    
            // Associated child node
            const subItem = menuTreeTravel(element.children, layer + 1);
    
            if (subItem.length) {
                element.children = subItem;
                return element;
            }
            // the else logic
            if (layer > 1) {
                element.children = subItem;
                return element;
            }
    
            if (!element.meta?.hideInMenu || !element.meta?.hideMenu) {
                return element;
            }
    
            return null;
        });
        return collector.filter(Boolean);
        // return collector.filter((item: any) => item !== null);
    }

    return {
        menuTree,
        menuTreeTravel,
    };
}
