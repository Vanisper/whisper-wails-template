import { App } from 'vue';
import { RouteRecordRaw, createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import { appRoutes } from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';
import createRouteGuard from './guard';
import PageEnum from '@/enum/page';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: PageEnum.LOGIN_NAME,
    },
    {
        path: PageEnum.LOGIN,
        name: PageEnum.LOGIN_NAME,
        component: () => import('@/views/login/index.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export const setupRouter = (app: App) => {
    app.use(router);
    createRouteGuard(router);
};

export default router;
