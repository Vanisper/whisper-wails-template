/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * # 搜索字段的注解
 * @author Hamm
 */
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig';
import { CoreSearchFieldConfig } from '../config/CoreSearchFieldConfig';
import { getFieldName } from './Custom';
import { CoreDecorator } from '../helper/CoreDecorator';

/**
 *  # 搜索字段key
 */
const FIELD_CONFIG_KEY = 'Search';

/**
 * # 搜索字段列表key
 */
const FIELD_LIST_KEY = 'SearchList';

/**
 * # 标记该字段可用于搜索
 * @param fieldConfig [可选]搜索配置项
 */
export function SearchField(fieldConfig: ISearchFieldConfig = {}): Function {
    return (target: any, key: string) => {
        fieldConfig.key = key;
        return CoreDecorator.setFieldConfig(target, key, FIELD_CONFIG_KEY, fieldConfig, FIELD_LIST_KEY);
    };
}

/**
 * # 获取对象某个字段标记的搜索配置项
 * @param target 目标类或对象
 * @param key 属性名
 */
export function getSearchConfig(target: any, key: string): CoreSearchFieldConfig | null {
    return CoreDecorator.getFieldConfig(target, key, FIELD_CONFIG_KEY, true);
}
/**
 * # 获取标记了搜索配置的字段列表
 * @param target 目标对象
 */
export function getSearchFieldList(target: any): string[] {
    return CoreDecorator.getFieldList(target, FIELD_LIST_KEY);
}
/**
 * # 获取指定类的搜索字段配置项列表
 * @param target 目标类或对象
 * @param keyList 选择字段列表
 */
export function getSearchConfigList(target: any, keyList: string[]) {
    return CoreDecorator.getFieldConfigList(target, FIELD_LIST_KEY, FIELD_CONFIG_KEY, keyList, CoreSearchFieldConfig).sort((a, b) => b.orderNumber - a.orderNumber).map((item) => {
        item.label = item.label || getFieldName(target, item.key);
        return item;
    });
}
