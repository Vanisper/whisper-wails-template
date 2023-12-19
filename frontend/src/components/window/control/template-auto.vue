<template>
  <window-controls-dark v-if="appStore.theme == 'dark'" />
  <window-controls-light v-else />
</template>

<script lang="ts" setup>
import windowControlsDark from './template-dark.vue';
import windowControlsLight from './template-light.vue';

import { useAppStore } from '@/store';

const appStore = useAppStore();
</script>