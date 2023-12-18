import { App } from 'vue';
import permission from './permission';
import sortable from './sortable';
import horizontalScrollingDirective from './horizontal-scrolling';

const directives = {
    install(Vue: App) {
        Vue.directive('permission', permission);
        Vue.directive('sortable', sortable);
        Vue.directive('horizontal-scrolling', horizontalScrollingDirective);
    },
};

export const setupDirective = (app: App) => {
    app.use(directives);
};

export default directives;