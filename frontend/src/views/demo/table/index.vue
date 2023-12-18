<template>
    <div>
        <h1>TODO 全屏的表格组件</h1>
        <!-- TODO 全屏的表格组件 -->
        <div style="display: flex;">
            <!-- A basic anchor icon from Phosphor icons -->
            <div class="i-ph-anchor-simple-thin" />
            <!-- An orange alarm from Material Design Icons -->
            <div class="i-mdi-alarm text-orange-400" />
            <!-- A large Vue logo -->
            <div class="i-logos-vue text-3xl" />
            <!-- Sun in light mode, Moon in dark mode, from Carbon -->
            <button class="i-carbon-sun dark:i-carbon-moon" />
            <!-- Twemoji of laugh, turns to tear on hovering -->
            <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
        </div>
    </div>
</template>

<script lang="ts">
import { PageEnum } from '@/enum/page';

export default {
    name: PageEnum.DEMO_TABLE_NAME
};
</script>