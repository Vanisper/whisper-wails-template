import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';
import { PageEnum } from '@/enum/page';

const TEST: AppRouteRecordRaw = {
    path: PageEnum.TEST,
    component: DEFAULT_LAYOUT,
    meta: {
        order: -1,
        title: '测试',
        requiresAuth: true, // 在管理页面中的页面都需要设置这个属性，否则selected时menu的高亮会有问题
        single: true, // 设置这个的时候 ||| 子路由必须要有name、子路由path不生效 ||| 并且菜单会默认会将子路由的第一个的name处理为父级的name、子菜单会清空
        icon: 'icon-face-smile-fill',
    },
    children: [
        {
            path: '',
            name: PageEnum.TEST_NAME,
            component: () => import('@/views/test/index.vue'),
        },
    ],
};

export default TEST;