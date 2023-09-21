import { App } from "vue";
import { createPinia } from 'pinia';

import piniaPluginPersist from 'pinia-plugin-persistedstate';

const storer = createPinia()
export const setupStorer = (app: App) => {
    storer.use(piniaPluginPersist)
    app.use(storer)
}