<template>
    <div v-loading="isLoading" class="airpower">
        <router-view />

        <el-tooltip ref="tooltipRef" v-model:visible="isShowTooltip" :disabled="CoreStore().$state.tooltip === ''"
            :popper-options="{
                modifiers: [
                    {
                        name: 'computeStyles',
                        options: {
                            adaptive: false,
                            enabled: false,
                        },
                    },
                ],
            }" :virtual-ref="CoreStore().$state.tooltipRef" virtual-triggering trigger="hover" effect="customized"
            :content="CoreStore().$state.tooltip" placement="top" popper-class="air-tooltip" />
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { CoreConfig } from './config/CoreConfig';
import { CoreAlert } from './feedback/CoreAlert';
import { CoreStore } from './store/CoreStore';

const isLoading = ref(true);

const isShowTooltip = ref(false);

const tooltipRef = ref();

onMounted(() => {
    isLoading.value = false;
});

const coreInit = () => {
    if (!CoreConfig.router) {
        CoreAlert.error('请在main.ts中配置 CoreConfig.router', '请先配置');
    }
};
coreInit();

let tooltipTimer: NodeJS.Timeout;

watch(() => CoreStore().tooltipRef, () => {
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(() => {
        isShowTooltip.value = false;
    }, 2000);
});
</script>
<style scoped lang="scss">
.airpower {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    :deep(.el-loading-mask) {
        background-color: white;
    }
}
</style>
