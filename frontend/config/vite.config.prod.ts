import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configImageminPlugin from './plugin/imagemin';

export default mergeConfig(
    {
        mode: 'production',
        plugins: [
            configCompressPlugin('gzip'),
            configVisualizerPlugin(),
            configArcoResolverPlugin(),
            configImageminPlugin(),
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        arco: ['@arco-design/web-vue'],
                        chart: ['echarts', 'vue-echarts'],
                        vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
                    },
                },
            },
            chunkSizeWarningLimit: 2000,
            commonjsOptions: {
                // https://blog.csdn.net/weixin_42211816/article/details/119884511
                requireReturnsDefault: 'namespace'
            },          
        },
    },
    baseConfig,
);
