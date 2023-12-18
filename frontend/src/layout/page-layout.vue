<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="appStore.routerTransition ? 'my-slide-left' : ''" mode="out-in" appear>
            <keep-alive :include="cacheList">
                <component :is="Component" :key="route.fullPath" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTabBarStore, useAppStore } from '@/store';

const tabBarStore = useTabBarStore();
const appStore = useAppStore();

const cacheList = computed(() => {   
    return tabBarStore.getCacheList;
});
</script>

<style scoped lang="less"></style>
