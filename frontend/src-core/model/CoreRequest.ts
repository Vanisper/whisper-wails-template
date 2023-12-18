import { CoreEntity } from '../base/CoreEntity'
import { CoreModel } from '../base/CoreModel'
import { Type } from '../decorator/Custom'
import { CoreClassTransformer } from '../helper/CoreClassTransformer'
import { ClassConstructor } from '../type/ClassConstructor'
import { CoreSort } from './CoreSort'

/**
 * # 请求类
 * @author Hamm
 */
export class CoreRequest<E extends CoreEntity = CoreEntity> extends CoreModel {
  /**
   * # 查询信息
   */
  filter!: E

  /**
   * # 关键词搜索
   */
  @Type(String) keyword!: string

  /**
   * # 排序信息
   */
  @Type(CoreSort) sort!: CoreSort

  /**
   * # 初始化一个请求类
   * @param filterClass 如传入filter的类 将自动初始化一个空filter
   */
  constructor(filterClass: ClassConstructor<E>) {
    super()
    if (filterClass) {
      this.filter = CoreClassTransformer.parse({}, filterClass)
    }
  }

  /**
   * # 设置排序对象
   * @param sort 排序对象
   */
  setSort(sort: CoreSort): this {
    this.sort = sort
    return this
  }
}
