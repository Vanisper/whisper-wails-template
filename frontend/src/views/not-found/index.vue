<template>
    <div class="content">
        <a-result class="result" status="404" :subtitle="'not found'"> </a-result>
        <div class="operation-row">
            <a-button key="back" type="primary" @click="back"> back </a-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { DEFAULT_ROUTE_NAME } from '@/router/constants';

const router = useRouter();
const back = () => {
    //FIXME：Go to the node that has the permission
    router.push({ name: DEFAULT_ROUTE_NAME });
};
</script>

<style scoped lang="less">
.content {
    // padding-top: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -95px;
    margin-top: -121px;
    text-align: center;
}
</style>
