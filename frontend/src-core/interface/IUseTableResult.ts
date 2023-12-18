/* eslint-disable no-unused-vars */
import { CoreEntity } from '../base/CoreEntity'
import { ITableHookResult } from './ITableHookResult'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'

/**
 * # 表格的Hook标准返回
 * @author Hamm
 */
export interface IUseTableResult<E extends CoreEntity, S extends CoreAbstractEntityService<E>> extends ITableHookResult<E, S> {

  /**
   * # 编辑事件
   *
   * @param row 选择的行
   */
  onEdit: (row: E) => void,

  /**
   * # 删除事件
   *
   * @param row 选择的行
   */
  onDelete: (row: E) => void,
}
