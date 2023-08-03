<template>
    <aside class="page-asidebar" style="--wails-draggable: drag;">
        <router-link v-for="(item, index) in asideList" :key="index" class="asider-item icon" :class="{
            active: $route.path === item.path,
        }" :to="item.path">
            <svg viewBox="0 0 1024 1024">
                <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
            </svg>
        </router-link>
        <slot></slot>
    </aside>
</template>

<script lang="ts" setup>
import { PageEnum } from "@/enums/pageEnum.ts";

const asideList = [
    {
        text: "首页",
        path: PageEnum.BASE_HOME,
        svg: [
            "M914.9 158.4H183.5c-15.2 0-27.6-12.4-27.6-27.6v-4.1c0-15.2 12.4-27.6 27.6-27.6h731.4c15.2 0 27.6 12.4 27.6 27.6v4.1c0.1 15.2-12.3 27.6-27.6 27.6zM914.9 819.9H183.5c-15.2 0-27.6-12.4-27.6-27.6v-4.1c0-15.2 12.4-27.6 27.6-27.6h731.4c15.2 0 27.6 12.4 27.6 27.6v4.1c0.1 15.2-12.3 27.6-27.6 27.6zM574.7 489.2H176.6c-11.4 0-20.7-9.3-20.7-20.7v-18.1c0-11.4 9.3-20.7 20.7-20.7h398.1c11.4 0 20.7 9.3 20.7 20.7v18.1c0 11.4-9.3 20.7-20.7 20.7z",
        ]
    },
    {
        text: "新任务",
        path: PageEnum.BASE_NEW_TASK,
        svg: [
            "M917.4 504.7H186.9c-14.8 0-26.8-12.1-26.8-26.8 0-14.8 12.1-26.8 26.8-26.8h730.5c14.8 0 26.8 12.1 26.8 26.8 0 14.8-12 26.8-26.8 26.8z",
            "M525.3 843.2V112.6c0-14.8 12.1-26.8 26.8-26.8 14.8 0 26.8 12.1 26.8 26.8v730.5c0 14.8-12.1 26.8-26.8 26.8-14.7 0.1-26.8-12-26.8-26.7z",
        ]

    },
    {
        text: "设置",
        path: PageEnum.BASE_SETTING,
        svg: [
            "M944.48 552.458667l-182.357333 330.666666a73.792 73.792 0 0 1-64.565334 38.325334h-362.133333a73.792 73.792 0 0 1-64.565333-38.325334l-182.357334-330.666666a75.338667 75.338667 0 0 1 0-72.682667l182.357334-330.666667a73.792 73.792 0 0 1 64.565333-38.325333h362.133333a73.792 73.792 0 0 1 64.565334 38.325333l182.357333 330.666667a75.338667 75.338667 0 0 1 0 72.682667z m-55.989333-31.146667a10.773333 10.773333 0 0 0 0-10.378667l-182.037334-330.666666a10.517333 10.517333 0 0 0-9.205333-5.482667H335.733333a10.517333 10.517333 0 0 0-9.205333 5.482667l-182.037333 330.666666a10.773333 10.773333 0 0 0 0 10.378667l182.037333 330.666667a10.517333 10.517333 0 0 0 9.205333 5.472h361.514667a10.517333 10.517333 0 0 0 9.205333-5.472l182.037334-330.666667zM513.738667 682.666667c-94.261333 0-170.666667-76.405333-170.666667-170.666667s76.405333-170.666667 170.666667-170.666667c94.250667 0 170.666667 76.405333 170.666666 170.666667s-76.416 170.666667-170.666666 170.666667z m0-64c58.912 0 106.666667-47.754667 106.666666-106.666667s-47.754667-106.666667-106.666666-106.666667-106.666667 47.754667-106.666667 106.666667 47.754667 106.666667 106.666667 106.666667z",
        ]
    },
];
</script>

<style lang="less" scoped>
.page-asidebar {
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 100%;
    background-color: var(--background-secondary);
    padding: 10px 0;
    box-sizing: border-box;
    overflow: hidden;
    transition: width 0.3s ease-in-out;

    // &:hover {
    //     width: 200px;
    // }

    .asider-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 100%;
        color: var(--text-secondary);
        text-decoration: none;
        margin-top: 8.75px;
        overflow: hidden;

        &:hover {
            background-color: var(--background-tertiary);
        }

        &.active {
            background-color: var(--background-tertiary);
        }

        &.icon {
            width: 40px;
            height: 40px;
            margin-left: auto;
            margin-right: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            overflow: hidden;
            padding: 10px;
            box-sizing: border-box;

            svg {
                width: 100%;
                height: 100%;
                fill: var(--text-secondary);
            }
        }

        &.text {
            font-size: 12px;
        }

        &.icon-text {
            flex-direction: column;
        }
    }


}
</style>