import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { App } from 'vue';

// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
const setupArcoVue = (app: App) => {
    app.use(ArcoVue, {});
    app.use(ArcoVueIcon);
};

export default setupArcoVue;