/* eslint-disable @typescript-eslint/no-explicit-any */

import { CoreColor } from '../../enum/CoreColor'
import { IDictionary } from '../../interface/IDictionary'
import { CoreDictionary } from '../CoreDictionary'

/**
 * # 字典数组
 * @author Hamm
 */
export class CoreDictionaryArray<T extends IDictionary> extends Array<T> {
    /**
     * # 获取字典指定Key的Label
     * @param key Key
     * @param defaultLabel 默认Label
     */
    getLabel(key: boolean | number | string, defaultLabel = '-'): string {
        return this.get(key).label || defaultLabel
    }

    /**
     * # 获取字典指定Key的Color
     * @param key Key
     * @param defaultColor 默认Color
     */
    getColor(key: boolean | number | string, defaultColor: CoreColor | string = CoreColor.NORMAL): CoreColor | string {
        return this.get(key).color || defaultColor
    }

    /**
     * # 获取一个字典选项
     * ---
     * ### 💡 可能返回一个空字典 但你可以放心的点属性
     * @param key Key
     */
    get(key: boolean | number | string): T {
        return this.findByKey(key) as T || {}
    }

    /**
     * # 查找一个字典选项 可能找不到
     * ---
     * ### 💡 可以尝试 ```.get()``` 后放心大胆的点属性
     * @param key Key
     */
    findByKey(key: boolean | number | string): T | undefined {
        return this.find((item) => item.key === key)
    }

    /**
     * # 创建可扩展的字典
     * @param list 字典数组
     */
    static createCustom<T extends IDictionary>(list: T[]): CoreDictionaryArray<T> {
        const dictionary = new CoreDictionaryArray<T>()
        list.forEach((json: T) => {
            const item = { ...new CoreDictionary(), ...json }
            dictionary.push(item)
        })
        return dictionary
    }

    /**
     * # 创建字典
     * @param list 字典数组
     */
    static create(list: IDictionary[]): CoreDictionaryArray<IDictionary> {
        return this.createCustom(list)
    }
}
