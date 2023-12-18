import { defineStore } from 'pinia';
import {
    login as userLogin,
    logout as userLogout,
    getUserInfo,
    LoginData,
} from '@/api/bak/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';
import useTabBarStore from '../tab-bar';

const useUserStore = defineStore('user', {
    persist: true,
    state: (): UserState => ({
        name: undefined,
        avatar: undefined,
        job: undefined,
        organization: undefined,
        location: undefined,
        email: undefined,
        introduction: undefined,
        personalWebsite: undefined,
        jobName: undefined,
        organizationName: undefined,
        locationName: undefined,
        phone: undefined,
        registrationDate: undefined,
        accountId: undefined,
        certification: undefined,
        role: '',
    }),

    getters: {
        userInfo(state: UserState): UserState {
            return { ...state };
        },
    },

    actions: {
        switchRoles() {
            return new Promise((resolve) => {
                this.role = this.role === 'user' ? 'admin' : 'user';
                resolve(this.role);
            });
        },
        hasPermission(roles: string[]) {            
            if (this.role) {     
                if (roles.includes('*')) return true; // 有*权限，直接放行
                return roles.includes(this.role);
            }
            return false;
        },
        // Set user's information
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },

        // Reset user's information
        resetInfo() {
            this.$reset();
        },

        // Get user's information
        async info() {
            // const res = await getUserInfo();
            // this.setInfo(res.data);
            this.setInfo({});
        },

        // Login
        async login(loginForm: LoginData) {
            try {
                // TODO 登录的接口
                // const res = await userLogin(loginForm);
                // 延迟2s
                
                const res = {
                    data: {
                        token: 'test-token',
                    }
                };
                setToken(res.data.token);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (err) {
                clearToken();
                throw err;
            }
        },
        logoutCallBack() {
            const appStore = useAppStore();
            const tabBarStore = useTabBarStore();
            this.resetInfo();
            clearToken();
            removeRouteListener();
            appStore.clearServerMenu();
            tabBarStore.resetTabList();
        },
        // Logout
        async logout() {
            try {
                await userLogout();
            } finally {
                this.logoutCallBack();
            }
        },
    },
});

export default useUserStore;
