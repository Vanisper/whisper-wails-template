import PageEnum from '@/enum/page';
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

/**
 * # 异常页路由
 * - 403: 无权限
 * - 404: 未找到
 * - 500: 服务器错误
 */
const EXCEPTION: AppRouteRecordRaw = {
    path: PageEnum.EXCEPTION,
    name: PageEnum.EXCEPTION_NAME,
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.exception',
        requiresAuth: true,
        icon: 'icon-exclamation-circle',
        order: 6,
    },
    redirect: PageEnum.ERROR_PAGE_403,
    children: [
        {
            path: PageEnum.ERROR_PAGE_403,
            name: PageEnum.ERROR_PAGE_NAME_403,
            component: () => import('@/views/exception/403/index.vue'),
            meta: {
                locale: 'menu.exception.403',
                requiresAuth: true,
                roles: ['admin'],
            },
        },
        {
            path: PageEnum.ERROR_PAGE_404,
            name: PageEnum.ERROR_PAGE_NAME_404,
            component: () => import('@/views/exception/404/index.vue'),
            meta: {
                locale: 'menu.exception.404',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: PageEnum.ERROR_PAGE_500,
            name: PageEnum.ERROR_PAGE_NAME_500,
            component: () => import('@/views/exception/500/index.vue'),
            meta: {
                locale: 'menu.exception.500',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};

export default EXCEPTION;
