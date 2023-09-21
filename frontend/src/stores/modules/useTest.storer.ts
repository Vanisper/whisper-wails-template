// pinia 测试

import { defineStore } from "pinia";

export const useTest = defineStore("test", {
    persist: true, // 持久化
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++
        }
    }
})
