import { createApp } from "vue";
import "./assets/styles/style.less";
import App from "./App.vue";

import { setupRouter } from "./routes";

function init() {
  const app = createApp(App);
  setupRouter(app);
  app.mount("#app");
};

void init();
