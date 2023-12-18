import { CoreColor } from '@core/enum/CoreColor';
import { CoreDictionaryArray } from '@core/model/extend/CoreDictionaryArray';

/**
 * # 禁用状态字典
 * @author Hamm
 */
export const DisableDictionary = CoreDictionaryArray.create([
    {
        key: true,
        label: '禁用',
        color: CoreColor.DANGER,
    },
    {
        key: false,
        label: '正常',
        color: CoreColor.SUCCESS,
    },
]);
