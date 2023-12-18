import { defineStore } from 'pinia';
import { Notification } from '@arco-design/web-vue';
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface';
import type { RouteRecordNormalized } from 'vue-router';

import defaultSettings from '@/config/settings.json';
import { getMenuList } from '@/api/bak/user';
import { AppState } from './types';
import { AxiosError } from 'axios';

const useAppStore = defineStore('app', {
    persist: false,
    state: (): AppState => ({ ...defaultSettings }),

    getters: {
        appCurrentSetting(state: AppState): AppState {
            return { ...state };
        },
        appDevice(state: AppState) {
            return state.device;
        },
        appAsyncMenus(state: AppState): RouteRecordNormalized[] {
            return state.serverMenu as unknown as RouteRecordNormalized[];
        },
    },

    actions: {
        // Update app settings
        updateSettings(partial: Partial<AppState>) {
            // @ts-expect-error-next-line
            this.$patch(partial);
        },

        // Change theme color
        toggleTheme(dark: boolean) {
            if (dark) {
                this.theme = 'dark';
                document.body.setAttribute('arco-theme', 'dark');
            } else {
                this.theme = 'light';
                document.body.removeAttribute('arco-theme');
            }
        },
        toggleDevice(device: string) {
            this.device = device;
        },
        toggleMenu(value: boolean) {
            this.hideMenu = value;
        },
        async fetchServerMenuConfig() {
            let notifyInstance: NotificationReturn | null = null;
            try {
                notifyInstance = Notification.info({
                    id: 'menuNotice', // Keep the instance id the same
                    content: 'loading',
                    closable: true,
                });
                const { data } = await getMenuList();
                this.serverMenu = data.map((item) => {
                    // NOTE ignoreCache 和 keepAlive 这两个模式是互斥的，将统一处理为 ignoreCache
                    // 后端采用的是 keepAlive 模式
                    if (item.meta.keepAlive) {
                        item.meta.ignoreCache = false;
                    } else {
                        item.meta.ignoreCache = true;
                    }
                    return item;
                });
                notifyInstance = Notification.success({
                    id: 'menuNotice',
                    content: 'success',
                    closable: true,
                });
            } catch (error) {
                const err = error as AxiosError;
                const message = `${err.message}(${err.config?.url})`;
                console.log(message);
                
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                notifyInstance = Notification.error({
                    id: 'menuNotice',
                    content: 'error: 已启用服务端菜单配置，但是获取菜单配置失败，请检查网络或联系管理员',
                    closable: true,
                    style: {
                        zIndex: 9999,
                    }
                });
            }
        },
        clearServerMenu() {
            this.serverMenu = [];
        },
    },
});

export default useAppStore;
