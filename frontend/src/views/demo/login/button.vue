<template>
    <button class="button" @click="handleBlur">{{ label }}</button>
</template>

<script lang="ts" setup>
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    themeColor: {
        type: String,
        default: 'rgb(var(--link-6))',
    },
});

// button点击之后失去焦点
const handleBlur = (e: MouseEvent) => {
    console.log(e);
    
    e.type=='click' && (e.target as HTMLButtonElement)?.blur();   
};
</script>

<style lang="less" scoped>
.button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    padding: 4px 16px;
    margin-top: 24px;
    min-height: 52px;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    cursor: pointer;
    color: #fff;
    border: 0;
    border-radius: 6px;
    transition: background-color .25s ease-in-out,box-shadow .25s ease-in-out;

    font-family: "Söhne",-apple-system,BlinkMacSystemFont,Helvetica,sans-serif;
    background-color: v-bind(themeColor);

    &:hover {
        box-shadow: inset 0 0 0 150px rgba(0,0,0,.1);
    }
    &:active {
        transform: scale(0.99);
    }
    &:focus {
        box-shadow: 0 0 0 4px rgba(0,123,173,.15), inset 0 0 0 150px rgba(0,123,173,.15)!important;
    }
}
</style>