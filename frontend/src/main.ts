import { createApp } from 'vue';
import App from './App.vue';

import { setupStore } from './store';
import { setupRouter } from './router';

import { setupComponent } from './components';
import { setupDirective } from './directives';
import { setupArcoVue, setupLocale } from './plugins';

import '@/assets/style/global.less';
import '@/assets/style/animation.less';
import '@/api/interceptor';
import 'virtual:uno.css';

// // 引入Element Plus
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import * as Icons from '@element-plus/icons-vue';
// // ELement Plus 中文
// import zhCn from 'element-plus/es/locale/lang/zh-cn';

function init() {
    const app = createApp(App);
    
    setupArcoVue(app); // arco组件库 setup
    // // ELement Plus 初始化
    // app.use(ElementPlus, { zIndex: 3000, locale: zhCn });
    // // 全局注册Element Plus 图标
    // Object.keys(Icons).forEach((key) => {
    //     app.component(key, Icons[key as keyof typeof Icons]);
    // });

    setupRouter(app); // 路由 setup
    setupStore(app); // 全局状态管理 setup

    setupComponent(app); // 全局组件 setup
    setupDirective(app); // 自定义指令 setup
    setupLocale(app); // 多语言 setup

    app.mount('#app');
}

void init();