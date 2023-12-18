import { PageEnum } from '@/enum/page';
import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
    path: PageEnum.DASHBOARD,
    name: PageEnum.DASHBOARD_NAME,
    component: DEFAULT_LAYOUT,
    meta: {
        locale: 'menu.dashboard',
        requiresAuth: true,
        icon: 'icon-dashboard',
        order: 0,
    },
    redirect: PageEnum.WORKPLACE,
    children: [
        {
            path: PageEnum.WORKPLACE,
            name: PageEnum.WORKPLACE_NAME,
            component: () => import('@/views/dashboard/workplace/index.vue'),
            meta: {
                locale: 'menu.dashboard.workplace',
                title: '工作台',
                requiresAuth: true,
                roles: ['*'],
                ignoreCache: true, // 首页不缓存，因为首页的数据需要实时更新
            },
        },
        /** simple */
        {
            path: PageEnum.MONITOR,
            name: PageEnum.MONITOR_NAME,
            component: () => import('@/views/dashboard/monitor/index.vue'),
            meta: {
                locale: 'menu.dashboard.monitor',
                title: '监控页',
                requiresAuth: true,
                roles: ['admin'],
            },
        },
    /** simple end */
    ],
};

export default DASHBOARD;
