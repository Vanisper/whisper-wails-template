<template>
    <aside class="page-asidebar" style="--wails-draggable: drag;" :style="{
        width: Expand ? '250px' : '60px',
        minWidth: Expand ? '250px' : '60px',
    }">
        <slot name="extend-top-before" />
        <div v-for="(item, index) in asideList.top" :key="index" class="asider-item-box">
            <router-link class="asider-item icon" v-if="item.type == 'route-link'" :to="item.path" :class="{
                active: $route.path === item.path,
                expand: Expand,
            }">
                <svg v-if="item.svg" viewBox="0 0 1024 1024">
                    <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
                </svg>
                <span class="svg-raw-box" v-else-if="item.svgRaw" v-html="item.svgRaw"></span>
                <span style="font-size: 12px;" v-else>{{ item.text }}</span>
                <span v-if="Expand" class="item-name">{{ item.text }}</span>
            </router-link>
            <a class="asider-item icon" :class="{
                expand: Expand,
            }" v-else-if="item.type == 'out-link'" :href="item.path" target="_blank">
                <svg v-if="item.svg" viewBox="0 0 1024 1024">
                    <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
                </svg>
                <span class="svg-raw-box" v-else-if="item.svgRaw" v-html="item.svgRaw"></span>
                <span style="font-size: 12px;" v-else>{{ item.text }}</span>
                <span v-if="Expand" class="item-name">{{ item.text }}</span>
            </a>
            <div class="asider-item icon" :class="{
                expand: Expand,
            }" v-else-if="item.type == 'action-button'" @click="item.action">
                <svg v-if="item.svg" viewBox="0 0 1024 1024">
                    <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
                </svg>
                <span class="svg-raw-box" v-else-if="item.svgRaw" v-html="item.svgRaw"></span>
                <span style="font-size: 12px;" v-else>{{ item.text }}</span>
                <span v-if="Expand" class="item-name">{{ item.text }}</span>
            </div>
        </div>
        <slot name="extend-top-end" />
        <div class="asider-item-bottom"
            style="margin-top: auto;display: flex;justify-content: center;align-items: center;" :style="{
                flexDirection: Expand ? 'row' : 'column',
                padding: Expand ? '0 20px' : '0',
            }">
            <slot name="extend-bottom-before" />
            <div v-for="(item, index) in asideList.bottom" :key="index" class="asider-item-box" :style="{
                width: Expand ? 'fit-content' : '100%%',
            }" :title="item.text">
                <router-link class="asider-item icon" v-if="item.type == 'route-link'" :to="item.path" :class="{
                    active: $route.path === item.path,
                }">
                    <svg v-if="item.svg" viewBox="0 0 1024 1024">
                        <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
                    </svg>
                    <span class="svg-raw-box" v-else-if="item.svgRaw" v-html="item.svgRaw"></span>
                    <span style="font-size: 12px;" v-else>{{ item.text }}</span>
                </router-link>
                <a class="asider-item icon" v-else-if="item.type == 'out-link'" :href="item.path" target="_blank">
                    <svg v-if="item.svg" viewBox="0 0 1024 1024">
                        <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
                    </svg>
                    <span class="svg-raw-box" v-else-if="item.svgRaw" v-html="item.svgRaw"></span>
                    <span style="font-size: 12px;" v-else>{{ item.text }}</span>
                </a>
                <div class="asider-item icon" v-else-if="item.type == 'action-button'" @click="item.action">
                    <svg v-if="item.svg" viewBox="0 0 1024 1024">
                        <path v-for="(d, i) in item.svg" :key="i" :d="d"></path>
                    </svg>
                    <span class="svg-raw-box" v-else-if="item.svgRaw" v-html="item.svgRaw"></span>
                    <span style="font-size: 12px;" v-else>{{ item.text }}</span>
                </div>
            </div>
            <slot name="extend-bottom-end" />
        </div>
    </aside>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { asideList } from "./asideList";

defineProps({
    Expand: {
        type: Boolean,
        default: false,
    },
    style: {
        type: Object as PropType<{
            color?: string;
            actionColor?: string;
            hoverColor?: string;
            backgroundColor?: string;
            buttonActionColor?: string;
            buttonHoverColor?: string;
        }>,
        required: false,
    }
});

</script>
<style lang="less">
.svg-raw-box {
    display: flex;
    // width: 100%;
    height: 100%;

    svg {
        width: 100%;
        height: 100%;
        fill: v-bind("style?.color || 'var(--text-secondary)'") !important;

        path {
            fill: v-bind("style?.color || 'var(--text-secondary)'") !important;
        }
    }

}

.asider-item {
    &:hover {
        svg {
            fill: v-bind("style?.hoverColor || 'var(--text-secondary)'");

            path {
                fill: v-bind("style?.hoverColor || 'var(--text-secondary)'");
            }
        }
    }
}

.active {
    .svg-raw-box {
        svg {
            fill: v-bind("style?.actionColor || 'var(--text-secondary)'") !important;

            path {
                fill: v-bind("style?.actionColor || 'var(--text-secondary)'") !important;
            }
        }
    }
}
</style>
<style lang="less" scoped>
.asider-item-box {
    height: fit-content;
    width: 100%;
    display: flex;
}

.asider-item-bottom {
    .asider-item {
        margin-top: v-bind("Expand ? '' : '8.75px'") !important;
    }
}

.page-asidebar {
    display: flex;
    flex-direction: column;
    width: 60px;
    height: 100%;
    background-color: v-bind("style?.backgroundColor || 'var(--background-secondary)'");
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
        color: v-bind("style?.color || 'var(--text-secondary)'");
        text-decoration: none;
        margin-top: 8.75px;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            background-color: v-bind("style?.buttonHoverColor || 'var(--background-tertiary)'");
            color: v-bind("style?.hoverColor || 'var(--text-secondary)'");

            svg {
                fill: v-bind("style?.hoverColor || 'var(--text-secondary)'");
            }
        }

        &.active {
            background-color: v-bind("style?.buttonActionColor || 'var(--background-tertiary)'");
            color: v-bind("style?.actionColor || 'var(--text-secondary)'");

            svg {
                fill: v-bind("style?.actionColor || 'var(--text-secondary)'") !important;

                path {
                    fill: v-bind("style?.actionColor || 'var(--text-secondary)'") !important;
                }
            }
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
                // width: 100%;
                height: 100%;
                fill: v-bind("style?.color || 'var(--text-secondary)'");
            }

            &.expand {
                width: 100%;
                align-items: center;
                justify-content: start;
                margin-left: 20px;
                margin-right: 20px;
                padding-left: 20px;

                .item-name {
                    margin-left: 10px;
                    font-weight: bold;
                }
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