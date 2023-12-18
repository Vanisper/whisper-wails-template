/* eslint-disable @typescript-eslint/ban-types */
import { App, Component, createApp } from 'vue';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { CoreExportModel } from '../model/CoreExportModel';
import { AUpload } from '../component';
import ExportView from '../component/toolbar/Export.vue';
import { IUploadConfig } from '../interface/IUploadConfig';
import { IFile } from '../interface/IFile';
import { CoreRequest } from '../model/CoreRequest';
import { CoreEntity } from '../base/CoreEntity';
import { IJson } from '../interface/IJson';
import { CoreStore } from '../store/CoreStore';

/**
 * # 弹窗助手类
 * @author Hamm
 */
export class CoreDialog {
    /**
  * # 弹出对话框的内部方法
  * @param view 使用的视图组件 传入一个import的vue
  * @param param 弹窗参数 将传入到合并到props上
  */
    static async build<RES>(view: Component, param: IJson): Promise<RES> {
        const parentNode = document.createElement('div');
        const domId = `dialog_${Math.random()}`;
        parentNode.setAttribute('id', domId);
        let app: App<Element> | undefined;

        // 卸载dom的方法
        const unmount = () => {
            if (app) {
                app.unmount();
                document.body.removeChild(parentNode);
                app = undefined;
            }
        };
        return new Promise((resolve) => {
            if (app) {
                return;
            }

            const dialogParam = {
                onConfirm: async (p: RES) => {
                    unmount();
                    resolve(p);
                },
                onCancel: () => {
                    unmount();
                },
                ...param,
            };
            /**
       * 创建App实例
       */
            app = createApp(view, dialogParam);

            app.directive('tip', {
                mounted(el, binding) {
                    el.addEventListener('mouseover', () => {
                        if (binding.value) {
                            CoreStore().tooltipRef = el;
                            CoreStore().tooltip = binding.value;
                        }
                    });
                },
            });

            app.use(ElementPlus, { locale: zhCn });

            // 注册全局组件
            Object.keys(Icons).forEach((key) => {
                if (app) {
                    app.component(key, Icons[key as keyof typeof Icons]);
                }
            });

            document.body.appendChild(parentNode);
            // 挂载组件
            app.mount(parentNode);
        });
    }

    /**
   * # 弹出一个弹窗
   * @param view 使用的视图组件 传入一个import的vue
   * @param param [可选]参数 将传入到目标对象的props.param参数上
   */
    static async show<RES>(view: Component, param?: unknown): Promise<RES> {
        return this.build<RES>(view, {
            param,
        });
    }

    /**
   * # 弹出上传文件对话框
   * @param config [可选]上传自定义配置
   * @param customConfirm [可选]自定义确认按钮回调方法
   * @param F [可选泛型] 💡 可通过 ```CoreConfig.defaultFileEntity``` 配置, 默认为 ```CoreFileEntity```
   */
    static async showUpload<F extends IFile>(config?: IUploadConfig, customConfirm?: Function): Promise<F> {
        return this.build<F>(AUpload, {
            onCustomConfirm: () => {
                if (customConfirm) {
                    customConfirm();
                }
            },
            ...config,
        });
    }

    /**
   * # 创建一个导出任务
   * @param url 接口地址
   * @param exportParam [可选]导出request参数对象
   */
    static async createExportTask<R extends CoreRequest>(url: string, exportParam?: R): Promise<unknown> {
        const param = new CoreExportModel(url, exportParam);
        return this.show(ExportView, param);
    }

    /**
   * # 弹出一个单选选择器
   * @param view 使用的视图组件 传入一个import的vue
   * @param param [可选]普通参数 将传入到目标对象的props.param参数上
   */
    static async select<E extends CoreEntity>(view: Component, param: E | undefined = undefined): Promise<E> {
        return this.build(view, {
            param,
        });
    }

    /**
   * # 弹出一个多选选择器
   * @param view 使用的视图组件 传入一个import的vue
   * @param selectList [可选]已选列表 将传入到目标对象的props.selectList参数上
   * @param param [可选]普通参数 将传入到目标对象的props.param参数上
   */
    static async selectList<E extends CoreEntity>(view: Component, selectList: E[] = [], param: E | undefined = undefined): Promise<E[]> {
        return this.build(view, {
            selectList,
            mult: true,
            param,
        });
    }
}
