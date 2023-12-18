import { CoreConfig } from '../config/CoreConfig'
import { CoreDateTimeFormatter } from '../enum/CoreDateTimeFormatter'
import { CoreDateTimeType } from '../enum/CoreDateTimeType'
import { IDictionary } from '../interface/IDictionary'
import { CoreFieldConfig } from './CoreFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { CoreTrim } from '../enum/CoreTrim'
import { CoreDictionaryArray } from '../model/extend/CoreDictionaryArray'

/**
 * # 表单字段配置实现类
 * @author Hamm
 */
export class CoreFormFieldConfig extends CoreFieldConfig implements IFormFieldConfig {
    dateFormatter = CoreDateTimeFormatter.TIMESTAMP

    dateShowFormatter?: CoreDateTimeFormatter

    dateType?: CoreDateTimeType

    max = CoreConfig.maxNumber

    min = CoreConfig.minNumber

    maxLength?: number

    minLength?: number

    placeholder?: string

    textarea?: boolean

    number?: boolean

    orderNumber = 1

    precision: number = CoreConfig.numberPrecision

    password?: boolean

    prefixIcon?: string

    suffixIcon?: string

    suffixText?: string

    clearable = true

    multiple = false

    multipleLimit = 0

    collapseTags = true

    filterable = true

    showLimit?: boolean

    dictionary?: CoreDictionaryArray<IDictionary>

    checkStrictly = true

    emitPath = false

    showAllLevels = false

    autoSize = true

    minRows = CoreConfig.textareaMinRows

    maxRows = CoreConfig.textareaMaxRows

    switch = false

    hideSwitchLabel = false

    radio = false

    radioButton = false

    defaultValue?: string | number | boolean

    disableSwitchColor = false

    trim = CoreTrim.NONE

    chinese = false

    mobilePhone = false

    requiredString = false

    requiredNumber = false

    telPhone = false

    phone = false

    email = false

    regExp = undefined
}
