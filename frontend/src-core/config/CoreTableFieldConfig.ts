import { CoreDateTimeFormatter } from '../enum/CoreDateTimeFormatter'
import { IDictionary } from '../interface/IDictionary'
import { CoreFieldConfig } from './CoreFieldConfig'
import { ITableFieldConfig } from '../interface/ITableFieldConfig'
import { CoreConfig } from './CoreConfig'
import { CoreDictionaryArray } from '../model/extend/CoreDictionaryArray'

/**
 * # 表格的字段配置实现类
 * @author Hamm
 */
export class CoreTableFieldConfig extends CoreFieldConfig implements ITableFieldConfig {
    hide = false

    removed = false

    width?: number

    minWidth?: number

    fixed?: 'left' | 'right'

    orderNumber = 1

    dictionary?: CoreDictionaryArray<IDictionary>

    dateTimeFormatter?: CoreDateTimeFormatter | string

    showColor = false

    sortable: boolean | 'custom' = false

    forceShow = false

    align: 'right' | 'left' | 'center' = 'left'

    suffixText?: string

    payloadField?: string

    friendlyDateTime = false

    copyField = false

    image = false

    imageWidth = 60

    imageHeight = 60

    emptyValue = CoreConfig.tableEmptyValue

    payloadArray = false

    arraySplitor = CoreConfig.arraySplitor

    nowrap = true
}
