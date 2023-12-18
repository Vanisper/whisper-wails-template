import { CoreModel } from '../base/CoreModel'

/**
 * # 标准实体接口
 * @author Hamm
 */
export interface IEntity extends CoreModel {
  /**
   * # 主键ID
   */
  id: number
}
