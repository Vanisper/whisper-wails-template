import type { RouteRecordNormalized } from 'vue-router';

//#region 导入指定目录下的所有模块
const modules = import.meta.glob('./modules/*.ts', { eager: true });
const externalModules = import.meta.glob('./externalModules/*.ts', { eager: true });
//#endregion

//#region 处理成路由格式的工具函数
function formatModules(_modules: any, result: RouteRecordNormalized[]) {
    Object.keys(_modules).forEach((key) => {
        const defaultModule = _modules[key].default;
        if (!defaultModule) return;
        const moduleList = Array.isArray(defaultModule)
            ? [...defaultModule]
            : [defaultModule];
        result.push(...moduleList);
    });
    return result;
}
//#endregion

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(externalModules, []);
