import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
  ],
  resolve: {
    //设置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@wailsjs": path.resolve(__dirname, "./wailsjs"),
      // "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        // 引入 mixin.less 这样就可以在全局中使用 mixin.less 中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: `
        @import "./src/assets/styles/mixin.less";
        @import "./src/assets/styles/theme/theme.less";
        @import "./src/assets/styles/util/index.less";
        `,
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      external(source, importer, isResolved) {
        console.log(source, importer, isResolved);
        // 判断是否是 `/assets-handler-` 开头的路径，如果是则认为是外部依赖
        return source.startsWith("/assets-handler-");
      },
    }
  }
});
