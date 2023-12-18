import { CoreModel } from '../base/CoreModel'
import { Type } from '../decorator/Custom'
import { CoreSortType } from '../enum/CoreSortType'

/**
 * # 排序类
 * @author Hamm
 */
export class CoreSort extends CoreModel {
  /**
   * # 排序字段 默认 ```id```
   */
  @Type(String) field = 'id'

  /**
   * # 排序方式 默认 ```desc```
   */
  @Type(String) direction = CoreSortType.DESC

  /**
   * # 设置排序字段名
   * @param field 字段名
   */
  setField(field: string): this {
    this.field = field
    return this
  }

  /**
   * # 设置排序方向
   * @param direction 方向
   */
  setDirection(direction: CoreSortType): this {
    this.direction = direction
    return this
  }
}
