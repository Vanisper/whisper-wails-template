import { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persistedstate';

import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';

import { useLockscreenStore } from './modules/lockscreen';

const store = createPinia();
export const setupStore = (app: App) => {
    store.use(piniaPluginPersist);
    app.use(store);
};

export {
    useAppStore, useUserStore, useTabBarStore,
    useLockscreenStore,
};