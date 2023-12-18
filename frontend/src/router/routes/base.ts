import type { RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enum/page';

export const DEFAULT_LAYOUT = () => import('@/layout/default-layout.vue');

export const REDIRECT_MAIN: RouteRecordRaw = {
    path: PageEnum.REDIRECT_WRAPPER,
    name: PageEnum.REDIRECT_WRAPPER_NAME,
    component: DEFAULT_LAYOUT,
    meta: {
        requiresAuth: true,
        hideInMenu: true,
    },
    children: [
        {
            path: PageEnum.REDIRECT,
            name: PageEnum.REDIRECT_NAME,
            component: () => import('@/views/redirect/index.vue'),
            meta: {
                requiresAuth: true,
                hideInMenu: true,
            },
        },
    ],
};

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
    path: PageEnum.NOT_FOUND,
    name: PageEnum.NOT_FOUND_NAME,
    component: () => import('@/views/not-found/index.vue'),
};
