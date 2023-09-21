<template>
  <div style="height: 300vh;">
    <h1>首页</h1>
    <a-button @click="useTest().increment">add: {{ useTest().count }}</a-button>
  </div>
</template>

// https://github.com/vuejs/core/issues/7799
// 解决了setup组件中没有显式定义组件name的问题  路由缓存的include、exclude属性匹配的是组件的name属性
<script lang="ts">
import { PageEnum } from "@/enums/pageEnum";
export default {
  name: PageEnum.BASE_HOME_NAME,
};
</script>
<script lang="ts" setup>
import { useTest } from "@/stores/modules";

</script>

<style lang="less" scoped>
/* styles here */
</style>
