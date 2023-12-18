import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';
import { RoleType } from '@/store/modules/user/types';
import { Message } from '@arco-design/web-vue';

function checkPermission(el: HTMLElement, binding: DirectiveBinding<RoleType[]>) {
    const { value } = binding;
    const userStore = useUserStore();

    if (Array.isArray(value)) {
        if (value.length > 0) {
            const permissionValues = value;
            // const hasPermission = permissionValues.includes(role);
            const hasPermission = userStore.hasPermission(permissionValues);
            
            if (!hasPermission && el.parentNode) {
                el.parentNode.removeChild(el);
            }
            if (hasPermission && !el.parentNode) {
                Message.info('若未生效，则需要重新加载当前路由或者页面');
            }
        }
    } else {
        throw new Error('need roles! Like v-permission="[\'admin\',\'user\']"');
    }
}

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding<RoleType[]>) {
        checkPermission(el, binding);
    },
    updated(el: HTMLElement, binding: DirectiveBinding<RoleType[]>) {
        checkPermission(el, binding);
    },
};
