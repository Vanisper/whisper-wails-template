<template>
    <div class="container">
        <div class="logo">
            <img alt="logo"
                :src="LogoSvg" />
            <div class="logo-text">{{ projectConfig.name }}</div>
        </div>
        <LoginBanner />
        <div class="content">
            <div class="content-inner">
                <LoginForm />
            </div>
            <div class="footer">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Footer from '@/components/footer/index.vue';
import LoginBanner from './components/banner.vue';
import LoginForm from './components/login-form.vue';
import { projectConfig } from '@/config/project';
import LogoSvg from '@/assets/logo.svg?url';

const widthMode = ref<'lg' | 'md'>('lg');
const mediaQueryHandler = (e: MediaQueryListEvent) => {
    widthMode.value  = e.matches ? 'md' :'lg';
};
/**
 * # 中等屏幕
 * ---
 * 见src\assets\style\breakpoint.less
 */
const mediaQueryMd = window.matchMedia('(max-width: 768px)');

onMounted(()=>{
    mediaQueryMd.addEventListener('change', mediaQueryHandler);
    widthMode.value = mediaQueryMd.matches ? 'md' :'lg';
});

onUnmounted(()=>{
    mediaQueryMd.removeEventListener('change', mediaQueryHandler);
});
</script>

<script lang="ts">
import { PageEnum } from '@/enum/page';

export default {
    name: PageEnum.LOGIN_NAME,
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    height: 100vh;

    .banner {
        // width: 550px;
        width: 55%;
        background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        padding-bottom: 40px;
    }

    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
    }
}

.logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
        margin-right: 4px;
        margin-left: 4px;
        color: var(--color-fill-1);
        font-size: 20px;
    }
}
</style>

<style lang="less" scoped>
// responsive
@media (max-width: @screen-lg) {
    .container {
        .banner {
            width: 45%;
            // 透明度
            opacity: 1;
        }
    }
}

@media (max-width: @screen-md) {
    .container {
        .banner {
            width: 0;
            // display: none;
            opacity: 0;
        }

        .logo .logo-text {
            display: none;
        }
    }
}
</style>
