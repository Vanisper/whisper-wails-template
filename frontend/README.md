## 项目介绍

该项目基于两个项目整合而成

- [arco-design-pro-vue](https://github.com/arco-design/arco-design-pro-vue "arco-design-pro-vue") - 本项目整体是基于此项目
  - 使用的是 [arco-design](https://arco.design/ "arco-design") 组件库
- [AirPower4T By HammCn](https://github.com/HammCn/AirPower4T "AirPower4T") - 参考了部分样式以及架构
  - 使用的是 [element-plus](https://element-plus.org/ "element-plus") 组件库

本项目计划构建一套通用型开发脚手架，能够适配后台管理、简单应用等场景，并将适配pc和移动端。

默认是启用了登录系统的，如果仅仅是简单应用的场景可以找到路由守卫 `src\router\guard` 相关的代码，注释掉权限管理、登录控制的相关路由守卫即可。

当注释掉权限控制的守卫之后，需要自行将路由的顶部进度条的 `NProgress.start()` 、 `NProgress.done()` 迁移至基础的路由守卫中，当然如果不需要此功能可不关注。

相关路由结构需要自行前往路由相关代码处修改

## 开发说明

尽量使用 `VSCode`开发本项目，安装配置好 `nodejs`，并全局安装 `pnpm` 。

使用VSCode开发时，注意下工作区的推荐插件，安装之以获得较好的开发体验。

> 注意将 `vue.volar` 插件切换至预览版：
>
> - 测试发现 `volar` 是否能正常工作与typescript的版本号有关，太高的ts版本会导致正式版的 `volar` 代码提示失效
> - 否则就将ts的版本降低至5.0之前，（目前的）正式版能正常工作的最后一个版本暂未具体试验

## 开发提示

### `try {} catch {}`

`try-catch` 模块中如果有异步请求，需要注意下该处是否是需要阻塞等待的，否则可以不用添加 `await` 关键字。

以上的注意项主要是为了视图上的正确响应，如果此处是需要阻塞等待的，而没有 `await` 关键字，会出现视图上的效果略微提前。