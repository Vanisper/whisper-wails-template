import { PageEnum } from '@/enum/page';
/**
 * # 不受权限控制的路由
 * - name: 路由名称
 * - children: 子路由
 */
export const WHITE_LIST = [
    { name: PageEnum.NOT_FOUND_NAME, children: [] },
    { name: PageEnum.LOGIN_NAME, children: [] },
];

/**
 * # 页面丢失的路由
 * - name: 路由名称
 */
export const NOT_FOUND = {
    name: PageEnum.NOT_FOUND_NAME,
};

/**
 * # 默认路由名称
 */
export const DEFAULT_ROUTE_NAME = PageEnum.WORKPLACE_NAME;

export const DEFAULT_ROUTE = {
    locale: 'menu.dashboard.workplace',
    name: DEFAULT_ROUTE_NAME,
    fullPath: '/dashboard/workplace',
};
