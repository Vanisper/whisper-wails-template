import { CoreBetweenType } from '../enum/CoreBetweenType'
import { CoreFieldConfig } from './CoreFieldConfig'
import { CoreSearchDataType } from '../enum/CoreSearchDataType'
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { IDictionary } from '../interface/IDictionary'
import { CoreDictionaryArray } from '../model/extend/CoreDictionaryArray'

/**
 * # 查询字段配置实现类
 * @author Hamm
 */
export class CoreSearchFieldConfig extends CoreFieldConfig implements ISearchFieldConfig {
  hide = false

  orderNumber = 1

  dictionary?: CoreDictionaryArray<IDictionary>

  between = false

  betweenType = CoreBetweenType.DATE

  betweenMin = 0

  betweenMax = 100

  dataType = CoreSearchDataType.TEXT

  filterable = true
}
