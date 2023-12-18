import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';
import { PageEnum } from '@/enum/page';

const LISTDEMO: AppRouteRecordRaw = {
    path: PageEnum.DEMO,
    name: PageEnum.DEMO_NAME,
    component: DEFAULT_LAYOUT,
    meta: {
        requiresAuth: true,
        title: '示例',
        order: -1,
    },
    redirect: PageEnum.DEMO_LOGIN,
    children: [
        {
            path: PageEnum.DEMO_LOGIN,
            name: PageEnum.DEMO_LOGIN_NAME,
            component: () => import('@/views/demo/login/index.vue'),
            meta: {
                title: 'demo-登录',
            },
        },
        {
            path: PageEnum.DEMO_TABLE,
            name: PageEnum.DEMO_TABLE_NAME,
            component: () => import('@/views/demo/table/index.vue'),
            meta: {
                title: 'demo-表格',
            },
        },
    ],
};

export default LISTDEMO;