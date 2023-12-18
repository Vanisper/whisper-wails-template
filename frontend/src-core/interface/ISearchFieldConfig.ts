import { CoreBetweenType } from '../enum/CoreBetweenType'
import { IFieldConfig } from './IFieldConfig'
import { CoreSearchDataType } from '../enum/CoreSearchDataType'
import { IDictionary } from '../interface/IDictionary'
import { CoreDictionaryArray } from '../model/extend/CoreDictionaryArray'

/**
 * # 表格的字段配置接口
 * @author Hamm
 */
export interface ISearchFieldConfig extends IFieldConfig {
  /**
   * # 隐藏搜索
   */
  hide?: boolean;
  /**
   * # 排序 越大越靠上边
   */
  orderNumber?: number;

  /**
   * # 枚举字典
   * ---
   * 💡 可配置 ```filterable``` 等参数
   */
  dictionary?: CoreDictionaryArray<IDictionary>;

  /**
   * # 可筛选
   * ---
   * 💡 仅枚举字典下拉选择时有效
   */
  filterable?: boolean;

  /**
   * # 区间控件
   * ---
   * 💡 可配置 ```betweenType``` , ```betweenMin``` , ```betweenMax``` 等参数
   */
  between?: boolean;

  /**
   * # 区间类型
   */
  betweenType?: CoreBetweenType;

  /**
   * # 区间最小值
   */
  betweenMin?: number;

  /**
   * # 区间最大值
   */
  betweenMax?: number;

  /**
   * # 搜索数据类型
   */
  dataType?: CoreSearchDataType;

}
