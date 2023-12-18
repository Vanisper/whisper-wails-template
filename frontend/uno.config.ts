// uno.config.ts
import { defineConfig } from 'unocss';
import presetIcons from '@unocss/preset-icons';
import iconsData from './src/components/icon/data'; 

export default defineConfig({
    presets: [
        presetIcons({}),
    ],
    safelist: [...iconsData.map((el) => `i-${el}`)],
});