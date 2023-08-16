<template>
  <div>
    <h1>{{ $route.name }}</h1>
    <input type="text" />
  </div>
</template>

<script lang="ts" setup>
/* script here */
</script>
<script lang="ts">
import { PageEnum } from "../../enums/pageEnum";
export default {
  name: PageEnum.BASE_TEST_NAME,
};
</script>

<style lang="less" scoped>
/* styles here */
</style>
