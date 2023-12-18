import { CoreModel } from '../base/CoreModel';
import { ClassConstructor } from '../type/ClassConstructor';
import { IJson } from '../interface/IJson';
import { ITree } from '../interface/ITree';

/**
 * # 转换类型助手
 * @author Hamm
 */
export class CoreClassTransformer {
    /**
   * # 复制一个新的JSON对象
   * @param json JSON
   */
    static copyJson<T extends IJson>(json: T): T {
        if (!json) {
            return json;
        }
        return JSON.parse(JSON.stringify(json));
    }

    /**
   * # 树结构的数组转为普通数组
   * @param treeList 树结构的数组
   */
    static treeList2List<E extends ITree>(treeList: E[]): E[] {
        let list: E[] = [];
        treeList.forEach((item) => {
            list.push(item);
            if (item.children && item.children.length > 0) {
                list = list.concat(this.treeList2List(item.children));
            }
        });
        return list;
    }

    /**
   * # 转换JSON数据到指定类的对象
   * @param json JSON
   * @param TargetClass 目标类
   */
    // eslint-disable-next-line class-methods-use-this
    static parse<T extends CoreModel>(json: IJson, TargetClass: ClassConstructor<T>): T {
        return CoreModel.parse(new TargetClass(), json);
    }

    /**
   * # 转换JSON数组数据到指定类的对象数组
   * @param jsonArray JSON数组
   * @param TargetClass 目标类
   */
    static parseArray<T extends CoreModel>(jsonArray: IJson[], TargetClass: ClassConstructor<T>): T[] {
        return jsonArray.map((json) => this.parse(json, TargetClass));
    }

    /**
   * # 复制一个实例
   * @param from 来源类对象实例
   * @param TargetClass 目标类
   */
    static copy<F extends CoreModel, M extends CoreModel>(from: F, TargetClass: ClassConstructor<M>): M {
        return this.parse(from.toJson(), TargetClass);
    }

    /**
   * # 初始化一个指定类型的实例
   *
   * @param TargetClass 目标类
   */
    static newInstance<T extends CoreModel>(TargetClass: ClassConstructor<T>): T {
        return new TargetClass();
    }
}
