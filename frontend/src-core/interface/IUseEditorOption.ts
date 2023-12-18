/* eslint-disable no-unused-vars */
import { CoreEntity } from '../base/CoreEntity'
import { IUseDetailOption } from './IUseDetailOption'
import { IValidateRule } from './IValidateRule'

/**
 * # Editor的Hook可选配置
 */
export interface IUseEditorOption<E extends CoreEntity> extends IUseDetailOption<E> {
  /**
   * # 自定义验证
   */
  customRules?: IValidateRule,

  /**
   * # 编辑成功的提示消息
   */
  successMessage?: string

  /**
   * # 请求前拦截器
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   *
   * @param submitData 实体
   */
  beforeSubmit?: (submitData: E) => E | null
}
