<script setup lang="ts">
import { ref } from "vue";
import ParentLayout from "./layouts/parentLayout.vue";
import { Message } from "@arco-design/web-vue";
import { onMounted } from "vue";

const isExpand = ref(true);
const layoutMode = ref<"column" | "row">("row");
onMounted(() => {
  (window as any).Message = Message;
  Message.success("Hello world!");
});
</script>

<template>
  <parent-layout :LayoutMode="layoutMode" :Expand="isExpand" />
</template>

<style lang="less">
html,
body {
  background-color: var(--background-primary);
}
</style>
