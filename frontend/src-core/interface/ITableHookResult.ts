/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { CoreEntity } from '../base/CoreEntity'
import { CorePage } from '../model/CorePage'
import { CoreRequestPage } from '../model/CoreRequestPage'
import { CoreResponsePage } from '../model/CoreResponsePage'
import { CoreSort } from '../model/CoreSort'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'

/**
 * # TableHook的基础返回结构
 * @author Hamm
 */
export interface ITableHookResult<E extends CoreEntity, S extends CoreAbstractEntityService<E>> {
  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,

  /**
   * # 响应数据
   */
  response: Ref<CoreResponsePage<E>>,

  /**
   * # 请求数据
   */
  request: Ref<CoreRequestPage<E>>,

  /**
   * # 返回的单页数据列表
   */
  list: Ref<E[]>,

  /**
   * # 选中的数据列表
   */
  selectList: Ref<E[]>,

  /**
   * # 实体的实例
   */
  entity: E,

  /**
   * # Service的实例
   */
  service: S,

  /**
   * # 刷新数据 返回第一页 恢复默认搜索条件
   */
  onReloadData: () => void,

  /**
   * # 搜索事件
   *
   * @param request 请求对象
   */
  onSearch: (request: CoreRequestPage<E>) => void,

  /**
   * # 分页变更事件
   *
   * @param page 分页对象
   */
  onPageChanged: (page: CorePage) => void,

  /**
   * # 详情事件
   *
   * @param row 选择的行
   */
  onDetail: (row: E) => void,

  /**
   * # 添加事件
   */
  onAdd: () => void,

  /**
   * # 排序变更事件
   *
   * @param sort 排序对象
   */
  onSortChanged: (sort: CoreSort) => void,

  /**
   * # 多选事件
   *
   * @param list 选择的行列表
   */
  onSelected: (list: E[]) => void,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   *
   * @param request 请求对象
   */
  onGetList: (request: CoreRequestPage<E>) => void,

}
