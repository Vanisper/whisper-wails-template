import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';

import { useUserStore } from '@/store';
import PageEnum from '@/enum/page';

export default function useUser() {
    const router = useRouter();
    const userStore = useUserStore();
    const logout = async (logoutTo?: string) => {
        try {
            await userStore.logout();
        } catch (error) { /* empty */ } finally {
            const currentRoute = router.currentRoute.value;
            Message.success('登出成功');
            await router.push({
                name: logoutTo && typeof logoutTo === 'string' ? logoutTo : PageEnum.LOGIN_NAME,
                query: {
                    ...router.currentRoute.value.query,
                    redirect: currentRoute.name as string,
                },
                params: currentRoute.params,
            });
        }
    };
    return {
        logout,
    };
}

export { useUser };