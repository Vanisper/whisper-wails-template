/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoreAlert } from '../feedback/CoreAlert';
import { CoreNotification } from '../feedback/CoreNotification';
import { CoreClassTransformer } from '../helper/CoreClassTransformer';
import { IValidateRule } from '../interface/IValidateRule';
import { CoreValidator } from '../helper/CoreValidator';
import { ClassConstructor } from '../type/ClassConstructor';
import { CoreEntity } from './CoreEntity';
import { CoreRequest } from '../model/CoreRequest';
import { CoreResponsePage } from '../model/CoreResponsePage';
import { IJson } from '../interface/IJson';
import { CoreAbstractService } from './CoreAbstractService';

/**
 * # 实体API服务超类
 * ---
 * ### 💡 包含了常用的增删改查等方法
 *
 * @param E 泛型实体类 ```CoreEntity``` 的子类
 * @author Hamm
 */
export abstract class CoreAbstractEntityService<E extends CoreEntity> extends CoreAbstractService {
    /**
     * # 为基类提供当前的实体类
     * ---
     * ### 💡 请求时会通过这个类进行数据转换
     */
    abstract entityClass: ClassConstructor<E>

    /**
     * # 分页查询API地址的默认URL
     */
    protected urlForGetPage = 'getPage';

    /**
     * # 不分页查询API地址的默认URL
     */
    protected urlForGetList = 'getList';

    /**
     * # 不分页树查询API地址的默认URL
     */
    protected urlForGetTreeList = 'getTreeList';

    /**
     * # 查询详情API地址的默认URL
     */
    protected urlForGetDetail = 'getDetail';

    /**
     * # 添加API地址的默认URL
     */
    protected urlForAdd = 'add';

    /**
     * # 修改API地址的默认URL
     */
    protected urlForUpdate = 'update';

    /**
     * # 删除API地址的默认URL
     */
    protected urlForDelete = 'delete';

    /**
     * # 查询分页数据列表
     * @param request 请求对象
     */
    async getPage(request: CoreRequest<E>): Promise<CoreResponsePage<E>> {
        const json = await this.api(this.urlForGetPage).post(request);
        const responsePage = CoreClassTransformer.parse<CoreResponsePage<E>>(json, CoreResponsePage);
        responsePage.list = CoreClassTransformer.parseArray(responsePage.list as IJson[], this.entityClass);
        return responsePage;
    }

    /**
     * # 查询不分页数据列表
     * @param request 请求对象
     */
    async getList(request: CoreRequest<E>): Promise<E[]> {
        const json = await this.api(this.urlForGetList).post(request) as IJson[];
        return CoreClassTransformer.parseArray(json, this.entityClass);
    }

    /**
     * # 查询树结构数据数组
     * @param request 请求对象
     */
    async getTreeList(request: CoreRequest<E>): Promise<E[]> {
        const json = await this.api(this.urlForGetTreeList).post(request) as IJson[];
        return CoreClassTransformer.parseArray(json, this.entityClass);
    }

    /**
     * # 根据ID获取详情对象
     * @param id ID
     */
    async getDetail(id: number): Promise<E> {
        const json = await this.api(this.urlForGetDetail).post(this.newEntityInstance(id));
        return CoreClassTransformer.parse(json, this.entityClass);
    }

    /**
     * # 添加一条新的数据
     * @param data 保存的数据
     * @param message [可选]添加成功的消息提示内容
     * @param title [可选]添加成功的消息提示标题 默认 '添加成功'
     */
    async add(data: E, message?: string, title = '添加成功'): Promise<number> {
        const json = await this.api(this.urlForAdd).post(data);
        if (message) {
            CoreNotification.success(message, title);
        }
        return CoreClassTransformer.parse(json, this.entityClass).id;
    }

    /**
     * # 修改一条数据
     * @param data 修改的数据实体
     * @param message [可选]修改成功的消息提示内容
     * @param title [可选]修改成功的消息提示标题 默认 '修改成功'
     */
    async update(data: E, message?: string, title = '修改成功'): Promise<void> {
        await this.api(this.urlForUpdate).post(data);
        if (message) {
            CoreNotification.success(message, title);
        }
    }

    /**
     * # 保存一条数据并返回主键ID
     *
     * ### 💡 如包含ID 则更新 如不包含 则创建
     * ---
     *
     * @param data 保存的数据实体
     * @param message [可选]保存成功的消息提示内容
     * @param title [可选]保存成功的消息提示标题 默认 '保存成功'
     */
    async save(data: E, message?: string, title = '保存成功'): Promise<number> {
        if (data.id) {
            await this.update(data, message, title);
            return data.id;
        }
        return this.add(data, message, title);
    }

    /**
     * # 根据ID删除一条数据
     * @param id 删除的数据ID
     * @param message [可选]删除成功的消息提示内容
     * @param title [可选]删除成功的消息提示标题 默认 '删除成功'
     */
    async delete(id: number, message?: string, title = '删除成功'): Promise<void> {
        return this.api(this.urlForDelete).callbackError()
            .post(this.newEntityInstance(id))
            .then(() => {
                if (message) {
                    CoreNotification.success(message, title);
                }
            })
            .catch((err: Error) => {
                CoreAlert.error(err.message, '删除失败');
            });
    }

    /**
     * # 创建一个实体的实例
     * @param id [可选]ID
     */
    private newEntityInstance(id?: number): E {
        // eslint-disable-next-line new-cap
        const entity = new this.entityClass();
        if (id) {
            entity.id = id;
        }
        return entity;
    }

    /**
     * # 创建验证器
     * @param form 表单对象
     * @param moreRule [可选] 更多的验证规则
     */
    static createValidator<E extends CoreEntity>(form: E, moreRule: IValidateRule = {}) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return CoreValidator.createRules(form, this.newInstance(), moreRule);
    }

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    /**
     * ! 内部使用 请勿调用
     * @deprecated
     */
    createValidator<E extends CoreEntity>(form: E, moreRule: IValidateRule = {}) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return CoreValidator.createRules(form, this, moreRule);
    }
}
