<template>
    <a-config-provider v-if="!isLock" :locale="locale">
        <router-view />
        <global-setting />
    </a-config-provider>

    <transition v-if="isLock && $route.name !== PageEnum.LOGIN_NAME" name="slide-up">
        <LockScreen />
    </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import GlobalSetting from '@/components/global-setting/index.vue';
import { LockScreen } from '@/components/lock-screen';
import { useLockscreenStore } from '@/store/modules/lockscreen';
import useLocale from '@/hooks/locale';
import { PageEnum } from '@/enum/page';

const { currentLocale } = useLocale();
const route = useRoute();
const locale = computed(() => {
    switch (currentLocale.value) {
    case 'zh-CN':
        return zhCN;
    case 'en-US':
        return enUS;
    default:
        return enUS;
    }
});

const useLockscreen = useLockscreenStore();
const isLock = computed(() => useLockscreen.isLock);
const lockTime = computed(() => useLockscreen.lockTime);

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;

const timekeeping = () => {
    clearInterval(timer);
    if (route.name == PageEnum.LOGIN_NAME || isLock.value) return;
    // 设置不锁屏
    useLockscreen.setLock(false);
    // 重置锁屏时间
    useLockscreen.setLockTime();
    timer = setInterval(() => {
        // 锁屏倒计时递减
        useLockscreen.setLockTime(lockTime.value - 1);
        if (lockTime.value <= 0) {
            // 设置锁屏
            useLockscreen.setLock(true);
            return clearInterval(timer);
        }
    }, 1000);
};

onMounted(() => {
    document.addEventListener('mousedown', timekeeping);
});

onUnmounted(() => {
    document.removeEventListener('mousedown', timekeeping);
});
</script>
