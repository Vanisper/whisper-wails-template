import { CoreEntity } from '../base/CoreEntity'
import { CoreModel } from '../base/CoreModel'
import { Type } from '../decorator/Custom'
import { CorePage } from './CorePage'
import { CoreSort } from './CoreSort'

/**
 * # 响应分页类
 * @author Hamm
 */
export class CoreResponsePage<E extends CoreEntity> extends CoreModel {
  /**
   * # 返回的当前页数据列表
   */
  list: E[] = []

  /**
   * # 返回的页码信息
   */
  @Type(CorePage) page = new CorePage()

  /**
   * # 返回的排序信息
   */
  @Type(CoreSort) sort = new CoreSort()

  /**
   * # 返回总条数
   */
  @Type(Number) total = 0

  /**
   * # 返回总页数
   */
  @Type(Number) pageCount = 0
}
