import { CoreColor } from '@core/enum/CoreColor';
import { CoreDictionaryArray } from '@core/model/extend/CoreDictionaryArray';

export const PermissionSystemDictionary = CoreDictionaryArray.create([
    { key: false, label: '普通权限', color: CoreColor.NORMAL },
    { key: true, label: '系统权限', color: CoreColor.DANGER },
]);
