/* eslint-disable no-unused-vars */
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService';
import { CoreEntity } from '../base/CoreEntity';
import { IUseTableResult } from './IUseTableResult';

/**
 * # 树表格的Hook标准返回
 * @author Hamm
 */
export interface IUseTableTreeResult<E extends CoreEntity, S extends CoreAbstractEntityService<E>> extends IUseTableResult<E, S> {
  /**
   * # 表格行的添加按钮点击事件
   */
  onAddRow: (row: E) => void
}
