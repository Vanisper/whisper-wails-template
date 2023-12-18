import { defineComponent } from 'vue';
import type { RouteMeta, NavigationGuard } from 'vue-router';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

/**
 * @description: App route record base
 * ---
 * 当不表示嵌套路由，而是借助父级的布局的时候，meta的single为true 父级必须没有name(即使有也不起作用) hideChildrenInMenu为true 子路由必须有name
 */
export interface AppRouteRecordRaw {
  id?: string | number;
  hidden?: boolean;
  path: string;
  name?: string | symbol;
  meta?: RouteMeta;
  redirect?: string;
  component: Component | string;
  children?: AppRouteRecordRaw[];
  alias?: string | string[];
  props?: Record<string, any>;
  params?: Record<string, any>;
  beforeEnter?: NavigationGuard | NavigationGuard[];
  fullPath?: string;
}