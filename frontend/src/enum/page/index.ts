// 页面路由枚举配置

// const routes = [
//     // pathMatch是参数的名称，例如，要去/not/found
//     // { params: { pathMatch: ['not', 'found'] }}

//     // 最后一个*，它意味着重复的参数，如果您打算使用它的名称直接导航到未找到的路由，那么这是必要的
//     { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },

//     // 如果你省略了最后一个' * '，参数中的' / '字符将在解析或推入时被编码
//     { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound },
// ]

// !!! 枚举只负责定义路由名称和地址 !!!  不定义路由组件地址、meta等信息
export enum PageEnum {
    //#region 常量路由
    /** # 页面丢失路由 */
    NOT_FOUND_NAME = 'NotFound',
    NOT_FOUND = '/:pathMatch(.*)*',
    /** # 错误页面 */
    EXCEPTION = '/exception',
    EXCEPTION_NAME = 'Exception',
    ERROR_PAGE_NAME_403 = 'ErrorPage403',
    ERROR_PAGE_403 = '/exception/403',
    ERROR_PAGE_NAME_404 = 'ErrorPage404',
    ERROR_PAGE_404 = '/exception/404',
    ERROR_PAGE_NAME_500 = 'ErrorPage500',
    ERROR_PAGE_500 = '/exception/500',
    /** # 重定向路由 */
    REDIRECT_WRAPPER_NAME = 'RedirectWrapper',
    REDIRECT_WRAPPER = '/redirect',
    REDIRECT_NAME = 'Redirect',
    REDIRECT = '/redirect/:path',
    /** # 重载路由 */
    RELOAD_NAME = 'Reload',
    RELOAD = '/reload',
    //#endregion

    //#region 常用业务路由
    /** # 登录路由 */
    LOGIN_NAME = 'Login',
    LOGIN = '/login',
    /** # 主页路由 */
    HOME_NAME = 'home',
    /** # 仪表盘 */
    DASHBOARD_NAME = 'Dashboard',
    DASHBOARD = '/dashboard',
    /** # 工作台路由 */
    WORKPLACE_NAME = 'Workplace',
    WORKPLACE = '/dashboard/workplace',
    /** # 监控路由 */
    MONITOR_NAME = 'Monitor',
    MONITOR = '/dashboard/monitor',
    //#endregion

    //#region 自定义业务路由

    //#endregion

    //#region demo示例
    /** # demo路由 */
    TEST = '/test',
    /** # demo路由 */
    TEST_NAME = 'Test',
    /** # demo路由 */
    DEMO = '/demo',
    /** # demo路由 */
    DEMO_NAME = 'Demo',

    /** # demo登录路由 */
    DEMO_LOGIN = '/demo/login',
    /** # demo登录路由 */
    DEMO_LOGIN_NAME = 'LoginDemo',

    /** # demo登录路由 */
    DEMO_TABLE = '/demo/table',
    /** # demo登录路由 */
    DEMO_TABLE_NAME = 'TableDemo',
    //#endregion
}

export default PageEnum;