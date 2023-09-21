import { createApp } from "vue";
import "./assets/styles/style.less";
import App from "./App.vue";

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

import { setupRouter } from "./routes";
import { setupStorer } from "./stores";

function init() {
  const app = createApp(App);
  app.use(ArcoVue);
  app.use(ArcoVueIcon);
  setupRouter(app);
  setupStorer(app);

  app.mount("#app");
};

void init();
