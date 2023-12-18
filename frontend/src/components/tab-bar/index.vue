<template>
    <div class="tab-bar-container">
        <a-affix ref="affixRef" :offset-top="offsetTop">
            <div class="tab-bar-box">
                <div class="tab-bar-scroll">
                    <IconCaretLeft class="scroll-left" @click="horizontalScrolling?.stepLeft(50)" :style="{ 'display': horizontalScrolling?.isOverflow ? 'block' : 'none' }" />
                    <div ref="tagsWrapRef" class="tags-wrap">
                        <tab-item v-for="(tag, index) in tagList" :key="tag.fullPath" :index="index" :item-data="tag" />
                    </div>
                    <IconCaretRight class="scroll-right" @click="horizontalScrolling?.stepRight(50)"  :style="{ 'display': horizontalScrolling?.isOverflow ? 'block' : 'none' }"  />
                </div>
                <div class="tag-bar-operation"></div>
            </div>
        </a-affix>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { RouteLocationNormalized } from 'vue-router';
import {
    listenerRouteChange,
    removeRouteListener,
} from '@/utils/route-listener';
import { useAppStore, useTabBarStore } from '@/store';
import { HorizontalScrolling } from '@/utils/horizontal-scrolling';
import tabItem from './tab-item.vue';
import { AffixInstance } from '@arco-design/web-vue';

const appStore = useAppStore();
const tabBarStore = useTabBarStore();

const affixRef = ref<AffixInstance>();
const tagList = computed(() => {
    return tabBarStore.getTabList;
});
const offsetTop = computed(() => {
    return (appStore.navbar ? 60 : 0);
});

watch(
    () => appStore.navbar,
    () => {
        affixRef.value?.updatePosition();
    }
);
listenerRouteChange((route: RouteLocationNormalized) => {
    if (route.meta.ignoreCache) {
        tabBarStore.deleteCacheByName(route.name as string);
    }
    if (
        !route.meta.noAffix &&
            !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {        
        tabBarStore.updateTabList(route);
    }
}, true);
        
const tagsWrapRef = ref<HTMLDivElement>();
const horizontalScrolling = ref<HorizontalScrolling>();
onMounted(()=>{
    if (tagsWrapRef.value) {
        horizontalScrolling.value = new HorizontalScrolling(tagsWrapRef.value);
    }
});

onUnmounted(() => {
    horizontalScrolling.value?.destroy();
    removeRouteListener();
});
</script>

<style scoped lang="less">
.tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);

    .tab-bar-box {
        display: flex;
        background-color: var(--color-bg-2);
        border-bottom: 1px solid var(--color-border);

        .tab-bar-scroll {
            height: 32px;
            flex: 1;
            overflow: hidden;
            position: relative;

            .scroll-left,
            .scroll-right {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 20px;
                height: 100%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
                background-color: var(--color-bg-2);
                color: var(--color-text-1);
                display: none;
            }

            .scroll-left {
                left: 0;
                &.isStart {
                    color: var(--color-text-2);
                    cursor: not-allowed;
                }
            }

            .scroll-right {
                right: 0;
                &.isEnd {
                    color: var(--color-text-2);
                    cursor: not-allowed;
                }
            }

            .tags-wrap {
                padding: 4px 20px;
                height: 48px;
                white-space: nowrap;
                overflow-x: auto;

                :deep(.arco-tag) {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 6px;
                    cursor: pointer;

                    &:first-child {
                        .arco-tag-close-btn {
                            display: none;
                        }
                    }
                }
            }
        }
    }

    .tag-bar-operation {
        width: 100px;
        height: 32px;
    }
}
</style>
