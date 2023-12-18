import type { Router } from 'vue-router';
import { setRouteEmitter } from '@/utils/route-listener';
import setupUserLoginInfoGuard from './userLoginInfo';
import setupPermissionGuard from './permission';

function setupPageGuard(router: Router) {
    router.beforeEach(async (to) => {
        // 如果路由meta中设置了title，那么就设置title
        // if (to.meta.title) document.title = to.meta.title;
        document.title = to.meta.title || '';

        // 路由监听工具函数：发布订阅模式，此处为所有路由的起始部分，故在此处发布
        setRouteEmitter(to);
    });

    router.afterEach((to, from) => {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        // to.meta.transition = "fade"
    });
}

export default function createRouteGuard(router: Router) {
    setupPageGuard(router);
    setupUserLoginInfoGuard(router);
    setupPermissionGuard(router);
}
