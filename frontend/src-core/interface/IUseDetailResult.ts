import { Ref } from 'vue'
import { CoreEntity } from '../base/CoreEntity'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'

/**
 * # 详情的Hook标准返回
 */
export interface IUseDetailResult<E extends CoreEntity, S extends CoreAbstractEntityService<E>> {
  /**
   * # 对话框显示的标题
   */
  title: Ref<string>,

  /**
   * # 表单或详情数据
   */
  formData: Ref<E>,

  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,

  /**
   * # 当前Hook使用的Service实例
   */
  service: S

  /**
   * # 查询详情
   */
  getDetail: () => void,
}
