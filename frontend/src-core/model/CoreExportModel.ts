import { CoreModel } from '../base/CoreModel'
import { Type } from '../decorator/Custom'
import { CoreRequest } from './CoreRequest'

/**
 * # 导出的数据模型
 * @author Hamm
 */
export class CoreExportModel<R extends CoreRequest = CoreRequest> extends CoreModel {
  /**
   * # 导出请求的API地址
   */
  @Type(String) url!: string

  /**
   * # 请求的参数
   */
  param!: R

  /**
   * # 下载导出文件的临时令牌
   * ! 传参用
   */
  @Type(String) fileCode!: string

  /**
   * # 实例化一个导出模型
   * @param url [可选] 导出URL地址
   * @param param [可选] 导出的查询参数
   */
  constructor(url?: string, param?: R) {
    super()
    if (url) {
      this.url = url
    }
    if (param) {
      this.param = param
    }
  }
}
