<template>
    <div class="input-container">
        <div class="input-wrapper">
            <label class="input-label" :for="labelKey">{{ label }}</label>
            <input ref="inputRef" class="input" type="text" :name="labelKey"
                @blur="handleBlur" @focus="handleFocus" :autocomplete="labelKey"
                autocapitalize="none" spellcheck="false" autofocus>
            <div v-show="label" class="input-label-show">{{ label }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    defaultValue: {
        type: [String, Boolean, Number],
        default: '',
    },
    themeColor: {
        type: String,
        default: 'rgb(var(--link-6))',
    },
});

const labelKey = 'label';

const inputRef = ref<HTMLInputElement | null>(null);

// 监听ref组件的focus与否
const handleBlur = (e: FocusEvent) => {    
    e.type=='blur' && (e.target as HTMLInputElement)?.value && inputRef.value?.classList.add('input-active');
};
const handleFocus = (e: FocusEvent) => {
    e.type=='focus' && inputRef.value?.classList.remove('input-active');
};

</script>

<style lang="less" scoped>
.input-wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    border-radius: 6px;
    transition: box-shadow .2s ease-in-out, border-color .2s ease-in-out;
    background-color: inherit;

    .input-label {
        position: absolute;
        left: 16px;
        color: #6f7780;
        background-color: inherit;
        z-index: 1;
        padding: 1px 6px;
        top: 26px;
        transform: translateY(-50%);
        transition: transform .15s ease-in-out,top .15s ease-in-out,padding .15s ease-in-out;
        transform-origin: 0;
        max-width: 90%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 8px;
        font-size: 16px;
        
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    .input {
        appearance: none;
        font-family: inherit;
        font-size: 16px;
        height: 52px;
        line-height: 1.1;
        outline: none;
        padding: 0 16px;
        width: 100%;
        color: inherit;
        background-color: var(--color-bg-1);
        transition: box-shadow .2s ease-in-out, border-color .2s ease-in-out;
        border-radius: 6px;
        border: 1px solid #c2c8d0;

        &.input-active,
        &:focus {
            outline: none;
            border-color: v-bind(themeColor);

            // 兄弟元素 .input-label-show 的样式
            + .input-label-show {
                top: -2px;
                transform: scale(.88) translateX(-8px) translateY(-50%);
                overflow: visible;
                white-space: normal;
                color: v-bind(themeColor);
            }
        }

        &.input-active {
            border: 1px solid #c2c8d0;
            + .input-label-show {
                color: #6f7780;
            }
        }
    }

    .input-label-show {
        position: absolute;
        left: 16px;
        color: #6f7780;
        background-color: var(--color-bg-1);
        z-index: 1;
        padding: 1px 6px;
        top: 26px;
        transform: translateY(-50%);
        transition: transform .15s ease-in-out,top .15s ease-in-out, padding .15s ease-in-out, color .2s ease-in-out;
        transform-origin: 0;
        max-width: 90%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        pointer-events: none;

        margin-bottom: 8px;
        font-size: 16px;
    }
}
</style>