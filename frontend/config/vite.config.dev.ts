import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
import configArcoResolverPlugin from './plugin/arcoResolver';
import configVisualizerPlugin from './plugin/visualizer';

export default mergeConfig(
    {
        mode: 'development',
        server: {
            open: false,
            fs: {
                strict: true,
            },
        },
        plugins: [
            configVisualizerPlugin(),
            configArcoResolverPlugin(),
            eslint({
                cache: false,
                include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
                exclude: ['node_modules'],
            }),
        ],
    },
    baseConfig,
);
