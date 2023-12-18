<template>
  <el-link v-tip="copyTips" :underline="false" @click="copy">
    <slot>{{ content || "-" }}</slot>
  </el-link>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { CoreStore } from '../store/CoreStore';
import { CoreClipboard } from '../helper/CoreClipboard';

const props = defineProps({
    /**
   * # 复制的内容
   */
    content: {
        type: String,
        default: '',
    },
});

/**
 * 复制的默认提示
 */
const defaultTips = '点击复制';

/**
 * 当前显示的提示
 */
const copyTips = ref(defaultTips);

/**
 * 重置显示的timer
 */
let timer: NodeJS.Timeout;

/**
 * 复制事件
 */
async function copy() {
    if (!props.content) {
        return;
    }
    await CoreClipboard.copy(props.content);
    copyTips.value = '成功复制到剪切板!';
    CoreStore().tooltip = copyTips.value;
    clearTimeout(timer);
    timer = setTimeout(() => {
        copyTips.value = defaultTips;
        CoreStore().tooltip = copyTips.value;
    }, 2000);
}
</script>
