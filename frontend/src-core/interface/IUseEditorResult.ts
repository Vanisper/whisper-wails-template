import { Ref } from 'vue'
import { CoreFormInstance } from '../type/CoreType'
import { IValidateRule } from './IValidateRule'
import { CoreEntity } from '../base/CoreEntity'
import { IUseDetailResult } from './IUseDetailResult'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'

/**
 * # Editor的Hook标准返回
 */
export interface IUseEditorResult<E extends CoreEntity, S extends CoreAbstractEntityService<E>> extends IUseDetailResult<E, S> {
  /**
   * # 表单的Ref对象
   * ---
   * 你可以绑定到组件中, 它将自动为你验证
   * - ```ADialog``` 的 ```:form-ref```
   * - ```el-form``` 的 ```ref```
   */
  formRef: Ref<CoreFormInstance>,

  /**
   * # 表单的验证规则
   * ---
   * 💡 你可以绑定到 ```el-form``` 的 ```:rules``` 上
   */
  rules: IValidateRule,

  /**
   * # 表单提交的方法
   * ---
   * 💡 你可以使用 ```beforeSubmit``` 方法来拦截请求的数据
   */
  onSubmit: () => void,
}
