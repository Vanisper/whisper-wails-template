<template>
  <a-col class="banner">
    <a-row :span="8">
      <a-typography-title :heading="5" style="margin-top: 0">
        {{ $t('workplace.welcome') }}{{ userInfo.name }}
      </a-typography-title>
      <a-input style="width: 200px;"></a-input>
    </a-row>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const userInfo = computed(() => {
    return {
        name: userStore.name,
    };
});
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 20px 20px 0 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
</style>
