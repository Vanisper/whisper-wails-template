import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import { App } from "vue";
import { Layout } from "./constant";

import modules from "./modules";
import { PageEnum } from "@/enums/pageEnum";

const RootRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "Root",
    component: Layout,
    meta: {
      title: "",
      keepAlive: true,
    },
    redirect: PageEnum.BASE_HOME,
    children: [
      modules.homeRouters,
      modules.newTaskRouters,
      modules.testRouters,
      modules.settingRouters,
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...RootRoutes],
});

// 路由守卫
const createRouterGuards = (router: Router) => {
  const oldTitle = document.title;
  router.beforeEach((to, _from, next) => {
    // console.log("to", to.meta);
    // console.log("from", from.meta);
    // 如果路由meta中设置了title，那么就设置title 否则使用最开始的title
    const newTitle = to.meta.title as string | undefined;
    document.title = newTitle || oldTitle;
    next();
  });
};
export const setupRouter = (app: App) => {
  app.use(router);
  createRouterGuards(router);
};
