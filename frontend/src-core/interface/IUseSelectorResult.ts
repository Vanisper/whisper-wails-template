/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { CoreEntity } from '../base/CoreEntity'
import { ITableHookResult } from './ITableHookResult'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'

/**
 * # 选择器Hook的标准返回
 * @author Hamm
 */
export interface IUseSelectorResult<E extends CoreEntity, S extends CoreAbstractEntityService<E>> extends ITableHookResult<E, S> {

  /**
   * # Selector的标题
   */
  title: Ref<string>,
}
