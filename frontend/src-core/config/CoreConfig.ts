import {
    RouteRecordRaw, Router, createRouter, createWebHistory,
} from 'vue-router';

import { CoreDateTimeFormatter } from '../enum/CoreDateTimeFormatter';
import { CoreCode } from '../enum/CoreCode';
import { IFile } from '../interface/IFile';
import { INormalTreeProps } from '../interface/INormalTreeProps';
import { IUser } from '../interface/IUser';
import { CoreFileEntity } from '../model/entity/CoreFileEntity';
import { CoreUserEntity } from '../model/entity/CoreUserEntity';
import { ClassConstructor } from '../type/ClassConstructor';

/**
 * # CorePower 全局配置
 * ---
 * 💡 可自行在 ```main.ts``` 中覆盖此类中的配置
 * @author Hamm
 */
export class CoreConfig {
    // #region 全局配置
    /**
     * # CorePower版本号
     */
    static readonly version = 'v1.0.12';

    /**
     * # AppKey
     * ---
     * 💡 用于处理一些唯一场景做项目区分 以及Oauth2的AppKey
     */
    static appKey = 'corekey';

    /**
     * # AppKey Header
     */
    static appKeyHeader = 'appkey';

    /**
     * # 项目名称
     * ---
     * 💡 会显示在浏览器标题上
     */
    static product = '';
    // #endregion

    // #region 路由相关配置开始
    /**
     * # Vue 路由对象
     */
    static router: Router;

    /**
     * # 最近访问的路径
     */
    static lastPathKey = 'core_last_path';

    /**
     * # 设置上次访问的路径
     * @param path
     */
    static setLastPath(path: string): void {
        localStorage.setItem(this.lastPathKey, path);
    }

    /**
     * # 获取上次访问的路径
     */
    static getLastPath(): string {
        return localStorage.getItem(this.lastPathKey) || '';
    }

    /**
     * # 创建Vue路由实例
     * @param routes 路由配置文件
     * @param ignoreGuard 不使用守卫
     */
    static createRouter(routes: RouteRecordRaw[], ignoreGuard = false) {
        // 创建路由
        const router = createRouter({
            history: createWebHistory(),
            routes,
        });
        router.afterEach(() => {
            window.scrollTo(0, 0);
        });
        if (!ignoreGuard) {
            router.beforeEach((to, _, next) => {
                if (to.meta.name || to.name) {
                    window.document.title = `${to.meta.name || to.name} - ${CoreConfig.product}` || CoreConfig.product;
                }
                next();
            });
        }
        CoreConfig.router = router;
        return router;
    }
    // #endregion

    // #region 网络相关配置开始
    /**
     * # 接口根地址
     * ---
     * 💡 以 ```/``` 结尾
     */
    static apiUrl = import.meta.env.VITE_APP_API_URL || '/api/';

    /**
     * # 接口根地址
     * ---
     * 💡 以 ```/``` 结尾
     */
    static websocketUrl = import.meta.env.VITE_APP_WEBSOCKET_URL;

    /**
     * # Oauth2的authorize地址
     */
    static oauthUrl = import.meta.env.VITE_APP_OAUTH_URL || '/oauth2/authorize';

    /**
     * # 静态资源根路径
     * ---
     * 💡 以 ```/``` 结尾
     */
    static staticUrl = import.meta.env.VITE_APP_STATIC_URL || '/static/';

    /**
     * # 默认的文件上传地址
     */
    static uploadUrl = `${CoreConfig.apiUrl}attach/upload`;

    /**
     * # 上传文件默认字段名称
     */
    static uploadFileName = 'file';

    /**
     * # 默认的导入数据的URL
     *
     * ---
     * 😈 请注意 请勿包含 ```baseUrl``` 和 ```apiUrl```
     *
     * ---
     * 将自动拼接 ```apiUrl``` + ```baseUrl``` + ```importUrl```
     */
    static importUrl = 'import';

    /**
     * # 默认下载导入模板的URL
     *
     * ---
     * 😈 请注意 请勿包含 ```baseUrl``` 和 ```apiUrl```
     *
     * ---
     * 将自动拼接 ```apiUrl``` + ```baseUrl``` + ```importTemplateUrl```
     */
    static importTemplateUrl = 'importTemplate';

    /**
     * # 默认同步导出URL
     *
     * ---
     * 😈 请注意 请勿包含 ```baseUrl``` 和 ```apiUrl```
     *
     * ---
     * 将自动拼接 ```apiUrl``` + ```baseUrl``` + ```exportSyncUrl```
     */
    static exportSyncUrl = 'exportSync';

    /**
     * # 默认异步导出URL
     *
     * ---
     * 😈 请注意 请勿包含 ```baseUrl``` 和 ```apiUrl```
     *
     * ---
     * 将自动拼接 ```apiUrl``` + ```baseUrl``` + ```exportUrl```
     */
    static exportUrl = 'export';

    /**
     * # AccessToken对应的Key
     * ---
     * 💡 ```缓存的名称``` 和 ```Api传输的Header``` 都叫这个名字
     */
    static authorizationHeaderKey = 'Authorization';

    /**
     * # Http返回状态码的字段
     */
    static httpCodeKey = 'code';

    /**
     * # Http返回错误信息的字段
     */
    static httpMessageKey = 'message';

    /**
     * # Http返回数据的字段
     */
    static httpDataKey = 'data';

    /**
     * # 全局http请求返回 成功状态码
     */
    static successCode: CoreCode | number = CoreCode.SUCCESS;

    /**
     * # 全局http请求返回 登录状态码
     */
    static unAuthorizeCode: CoreCode | number = CoreCode.UNAUTHORIZED;
    // #endregion

    // #region 超时与错误配置开始
    /**
     * # 😠超时时间 毫秒
     * ---
     * 💡 超时后请求会自动断开并抛出异常
     */
    static timeout = 5000;

    /**
     * # 是否访问超时
     */
    static isTimeout = false;

    /**
     * # 标准错误提示标题
     */
    static errorTitle = '发生错误';

    /**
     * # 标准错误提示内容
     */
    static errorMessage = '系统发生了一些错误，请稍候再试 :)';
    // #endregion

    // #region 权限相关配置开始
    /**
     * # 权限列表
     */
    static permissionList: string[] = [];

    /**
     * # 是否自动处理常用权限
     *
     * 如此项配置为 ```false``` , 则 ```EntityConfig``` 中的 ```permissionPrefix``` 将自动失效
     *
     * 若此时 ```EntityConfig``` 没有配置其他的权限标识, 则认为不校验权限
     */
    static autoPermission = true;

    /**
     * # 是否有权限
     * @param permission 权限标识
     */
    static hasPermission(permission: string): boolean {
        return this.permissionList.includes(permission);
    }

    /**
     * # 保存身份令牌
     * @param accessToken 身份令牌
     */
    static saveAccessToken(accessToken: string): void {
        localStorage.setItem(this.authorizationHeaderKey, accessToken);
    }

    /**
     * # 获取身份令牌
     */
    static getAccessToken(): string {
        return localStorage.getItem(this.authorizationHeaderKey) || '';
    }

    /**
     * # 移除本地存储的身份令牌
     */
    static removeAccessToken(): void {
        localStorage.removeItem(this.authorizationHeaderKey);
    }
    // #endregion

    // #region 输入相关配置开始
    /**
     *  # 数字精度
     */
    static numberPrecision = 2;

    /**
     *  # 最大数字
     */
    static maxNumber = 999999999999999;

    /**
     *  # 最小数字
     */
    static minNumber = 0;

    /**
     *  # 文本域最大长度
     */
    static maxTextAreaLength = 200;

    /**
     *  # 文本最大长度
     */
    static maxTextLength = 50;

    /**
     * # 文本域的最小行数
     */
    static textareaMinRows = 3;

    /**
     * # 文本域的最大行数
     */
    static textareaMaxRows = 6;

    /**
     * # 普通文本输入是否默认显示长度限制标签(默认false)
     * ---
     * 💡 此项仅为默认, 如在装饰器中配置, 此项将无效
     */
    static showLengthLimitInput = false;

    /**
     * # TextArea是否默认显示长度限制标签(默认true)
     * ---
     * 💡 此项仅为默认, 如在装饰器中配置, 此项将无效
     */
    static showLengthLimitTextarea = true;

    /**
     * # 搜索框的提示文案
     * ---
     * 💡 此项仅为默认, 如手动传入, 此项将无效
     */
    static searchPlaceholder = '搜索...';
    // #endregion

    // #region 默认类型开始
    /**
     * # 默认的文件实现类
     */
    static fileEntityClass: ClassConstructor<IFile> = CoreFileEntity;

    /**
     * # 默认的用户实现类
     */
    static userEntityClass: ClassConstructor<IUser> = CoreUserEntity;
    // #endregion

    // #region 弹窗相关默认配置开始
    /**
     * # ESC是否可关闭掉所有的弹窗
     */
    static dialogCloseByEsc = true;

    /**
     * # 弹窗是否默认显示全屏按钮(默认true)
     * ---
     * 💡 此项仅为默认, 如手动传入, 此项将无效
     */
    static dialogFullable = true;

    /**
     * # 弹窗是否隐藏取消按钮
     * ---
     * 💡 此项仅为默认, 如手动传入, 此项将无效
     */
    static dialogHideCancel = true;

    /**
     * # 弹窗遮罩层是否可以关闭
     * ---
     * 💡 默认不允许遮罩层关闭 设置为 ```true``` 即允许遮罩层关闭
     */
    static dialogCloseByCover = false;
    // #endregion

    // #region 其他杂项
    /**
     * # 默认的格式化时间
     * ---
     * 💡 ```ADateTime``` ```ATable``` 的格式化都将默认使用这个配置
     * ```
     */
    static dateTimeFormatter = CoreDateTimeFormatter.YYYY_MM_DD_HH_mm_ss;

    /**
     * # 默认树结构配置数据
     */
    static treeProps: INormalTreeProps = {
        children: 'children',
        label: 'name',
    };

    /**
     * # 分页组件默认使用的页码列表
     * ---
     * 💡 此项仅为默认, 如手动传入, 此项将无效
     */
    static pageSizes = [20, 30, 50];

    /**
     * # 默认的表格空数据兜底字符串
     * ---
     * 💡 ```@TableField``` 装饰器中可以单独配置 ```emptyValue```,
     */
    static tableEmptyValue = '-';

    /**
     * # 默认的表格数组显示分割字符
     * ---
     * 💡 ```@TableField``` 装饰器中可以单独配置 ```arraySplitor```,
     */
    static arraySplitor = ',';

    /**
     * # AES加解密使用的key
     */
    static cryptoKey = 'abcdef0123456789';
    // #endregion
}
