import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import UnoCSS from 'unocss/vite';
import configArcoStyleImportPlugin from './plugin/arcoStyleImport';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        UnoCSS(),
        vueJsx(),
        svgLoader({ svgoConfig: {} }),
        configArcoStyleImportPlugin(),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, '../src'),
            },
            {
                find: '@core',
                replacement: resolve(__dirname, '../src-core'),
            },
            {
                find: 'assets',
                replacement: resolve(__dirname, '../src/assets'),
            },
            {
                find: 'vue-i18n',
                replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
            },
            {
                find: 'vue',
                replacement: 'vue/dist/vue.esm-bundler.js', // compile template
            },
        ],
        extensions: ['.ts', '.js'],
    },
    define: {
        'process.env': {
            REPORT: true,
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${resolve('src/assets/style/breakpoint.less')}";`,
                },
                additionalData: `
                @import "./src/assets/style/theme/theme.less";
                @import "./src/assets/style/util/index.less";
                `,
                javascriptEnabled: true,
            },
        },
    },
    // build: {
    //     assetsDir: 'assets-vite-config',
    //     // 暂时设置为false vite的BUG keep_classnames不生效导致反射获取类失败
    //     minify: false,
    // },
    // server: {
    //     open: true,
    //     host: '0.0.0.0',
    //     port: 3000,
    //     // 测试可以用我们提供的 https://service.hamm.cn 推荐我们的后端项目 https://github.com/HammCn/CorePower4J
    //     proxy: {
    //         '/api': {
    //             target: 'https://service.hamm.cn/api/',
    //             // target: 'http://127.0.0.1:8080/',
    //             rewrite: (path) => path.replace(/^\/api/, ''),
    //             changeOrigin: true,
    //         },
    //         '/oauth2': 'https://service.hamm.cn',
    //         // '/oauth2': 'http://127.0.0.1:8080',
    //     },
    // },
});
