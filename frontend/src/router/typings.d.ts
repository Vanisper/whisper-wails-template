import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        title?: string; // The name show in breadcrumb and sidebar (recommend set)
        roles?: string[]; // Controls roles that have access to the page
        requiresAuth?: boolean; // Whether login is required to access the current page (every route must declare)
        icon?: string; // The icon show in the side menu
        locale?: string; // The locale name show in side menu and breadcrumb
        hideMenu?: boolean;
        hideInMenu?: boolean; // If true, it is not displayed in the side menu
        hideChildrenInMenu?: boolean; // if set true, the children are not displayed in the side menu
        single?: boolean; // if set true, the route will not be cached by tabbar
        activeMenu?: string; // if set name, the menu will be highlighted according to the name you set
        order?: number; // Sort routing menu items. If set key, the higher the value, the more forward it is
        noAffix?: boolean; // if set true, the tag will not affix in the tab-bar
        // 路由缓存策略有两种模式，一种是keep-alive，一种是ignore-cache（后者相对于前者而言，可以理解为排除法，默认都会被缓存）
        ignoreCache?: boolean; // if set true, the page will not be cached
        // keepAlive?: boolean; // if set true, the page will be cached
        internalOrExternal?: boolean; // Whether it is an internal link 外部链接
    }
}
