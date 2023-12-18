declare module 'vue' {
    export interface GlobalComponents {
      Chart: typeof import('./chart/index.vue')['default']
      Breadcrumb: typeof import('./breadcrumb/index.vue')['default']
    }
}

export {};
