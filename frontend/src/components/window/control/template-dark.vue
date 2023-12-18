<template>
     <div style="display: flex;width: 100%;height: 36px;justify-content: end;">
      <window-controls
        :WindowOnTop="WindowOnTop" :WindowMinimise="WindowMinimise" :WindowMaximise="WindowMaximise"
        :WindowClose="WindowClose" :WindowIsMaximised="WindowIsMaximised" :WindowIsOnToped="WindowIsOnToped"
        :style="{
          fill: '#fff', hoverColorExcludeClose: '#34363b',
          hoverStyleOnlyClose: { backgroundColor: 'rgb(228, 79, 79)', fill: '#fff' },
        }"
      />
    </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { WindowMinimise, WindowMaximise, WindowClose, WindowOnTop, WindowIsMaximised, WindowIsOnToped, WindowIsFullScreen } from '@wailsjs/go/main/App';
import windowControls from './index.vue';
</script>