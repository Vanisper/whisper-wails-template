<script lang="ts">
import { PageEnum } from '@/enum/page';
export default {
    name: PageEnum.TEST_NAME,
};
</script>
<script lang="ts" setup>
import { useUserStore } from '@/store';
import { RoleType } from '@/store/modules/user/types';
import { watch, onMounted ,ref} from 'vue';

const userStore = useUserStore();

const permissionTest = ref<RoleType>();
onMounted(() => {
    !localStorage.getItem('permission-test') && localStorage.setItem('permission-test', '*');
    permissionTest.value = localStorage.getItem('permission-test') as RoleType;
});
watch(permissionTest, (val) => {
    val && localStorage.setItem('permission-test', val);
});
</script>

<template>
    <div class="test-wrapper">
        <div>
            <span>路由缓存测试</span><a-input></a-input>
        </div>
        
        <div>
            <span>当前角色{{ userStore.role }}</span>---
            <span>权限控制👉</span><span style="color: red;" v-if="permissionTest" v-permission='[permissionTest]'>{{ userStore.role }}</span>
            <div>
                选择该组件的权限是谁的：
                <a-select v-model="permissionTest">
                    <a-option value="*">所有</a-option>
                    <a-option value="user">user</a-option>
                    <a-option value="admin">admin</a-option>
                </a-select>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.test-wrapper {
    height: 100%;
    color: var(--color-text-1);

    div {
        display: flex;
        white-space: nowrap;
        align-items: center;
        background-color: var(--color-bg-2);
        padding: 10px;
        gap: 8px;
    }
}
</style>
