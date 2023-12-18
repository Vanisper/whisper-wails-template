import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';
import PageEnum from '@/enum/page';
import { DEFAULT_ROUTE_NAME } from '@/router/constants';

export default function setupUserLoginInfoGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
       
        const userStore = useUserStore();
        if (isLogin()) {
            if (to.name == PageEnum.LOGIN_NAME) {
                next({
                    name: DEFAULT_ROUTE_NAME,
                    query: {
                        ...to.query,
                    } as LocationQueryRaw,
                });
                // 刷新
                // window.location.reload();
                return;
            }
            if (userStore.role) {
                next();
            } else {
                try {
                    await userStore.info();
                    next();
                } catch (error) {
                    await userStore.logout();
                    next({
                        name: PageEnum.LOGIN_NAME,
                        query: {
                            redirect: to.name,
                            ...to.query,
                        } as LocationQueryRaw,
                    });
                }
            }
        } else {
            if (to.name ===  PageEnum.LOGIN_NAME) {
                next();
                return;
            }
            next({
                name: PageEnum.LOGIN_NAME,
                query: {
                    redirect: to.name,
                    ...to.query,
                } as LocationQueryRaw,
            });
        }
    });
}
