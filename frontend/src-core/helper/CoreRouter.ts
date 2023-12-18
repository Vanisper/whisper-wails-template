import { CoreConfig } from '../config/CoreConfig';
import { CoreNotification } from '../feedback/CoreNotification';
import { IMenu } from '../interface/IMenu';
import { CoreConsole } from './CoreConsole';

const modules = import.meta.glob('../../view/**/*.vue');

/**
 * # Vue路由助手
 * @author Hamm
 */
export class CoreRouter {
    /**
   * # 将CoreMenu菜单列表初始化到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter [可选] 父级路由 默认 admin
   * @param menuCacheKey [可选] 缓存Key 默认 CorePowerMenuList
   */
    static initVueRouter(menuList: IMenu[], parentRouter = 'admin', menuCacheKey = 'CorePowerMenuList'): void {
        localStorage.setItem(menuCacheKey, JSON.stringify(menuList));
        if (!CoreConfig.isTimeout) {
            this.addRouterAsync(menuList, parentRouter);
            this.reloadCacheMenuList(menuCacheKey);
        }
    }

    /**
   * # 将菜单添加到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter 父级路由名称
   */
    private static addRouterAsync(menuList: IMenu[], parentRouter: string): void {
        menuList.forEach((item) => {
            if (item.children && item.children.length > 0) {
                this.addRouterAsync(item.children, parentRouter);
                return;
            }
            if (!CoreConfig.router) {
                CoreNotification.error('请先向CoreConfig注入当前路由对象', '配置错误');
                return;
            }
            if (!item.name || (!item.path && !item.component)) {
                CoreConsole.error('路由初始化失败，缺少参数');
                return;
            }
            if (CoreConfig.router.hasRoute(item.id.toString())) {
                return;
            }
            CoreConfig.router.addRoute(parentRouter, {
                path: item.path,
                name: item.id.toString(),
                meta: {
                    name: item.name,
                },
                component: modules[`../../view${item.component || item.path}.vue`],
            });
        });
    }

    /**
   * # 重载缓存中的路由
   * @param menuCacheKey 提供缓存的Key
   * @param menuList [可选]子菜单,好兄弟,你不用传。
   */
    private static reloadCacheMenuList(menuCacheKey: string, menuList?: IMenu[]): void {
        if (!CoreConfig.router) {
            return;
        }
        if (!menuList && localStorage.getItem(menuCacheKey)) {
            menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]');
        }
        if (menuList === undefined) {
            return;
        }
        for (const item of menuList) {
            if (item.children && item.children.length > 0) {
                this.reloadCacheMenuList(menuCacheKey, item.children);
                // eslint-disable-next-line no-continue
                continue;
            }
            // eslint-disable-next-line no-restricted-globals
            const locationPathName = location.pathname;
            if (item.path === locationPathName) {
                localStorage.removeItem(menuCacheKey);
                // eslint-disable-next-line no-restricted-globals
                CoreConfig.router.replace(locationPathName + location.search);
                break;
            }
        }
    }
}
