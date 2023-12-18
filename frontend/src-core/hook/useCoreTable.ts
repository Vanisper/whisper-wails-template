import { CoreEntity } from '../base/CoreEntity';
import { CoreDialog } from '../helper/CoreDialog';
import { ClassConstructor } from '../type/ClassConstructor';
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService';
import { IUseTableOption } from '../interface/IUseTableOption';
import { CoreNotification } from '../feedback/CoreNotification';
import { IUseTableResult } from '../interface/IUseTableResult';
import { coreTableHook } from './coreTableHook';

/**
 * # 引入表格使用的Hook
 * @param entityClass 实体类
 * @param serviceClass 表格使用的Service类
 * @param option [可选] 更多配置
 */
export function useCoreTable<E extends CoreEntity, S extends CoreAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseTableOption<E> = {}): IUseTableResult<E, S> {
    const result = coreTableHook(entityClass, serviceClass, option);
    async function onEdit(row: E) {
        if (!option.editView) {
            CoreNotification.warning('请为 useCoreTableList 的 option 传入 editor');
            return;
        }
        try {
            await CoreDialog.show(option.editView, row);
        } finally {
            result.onReloadData();
        }
    }

    async function onDelete(data: E) {
        await result.service.delete(data.id, `删除${result.entity.getClassName()}成功`);
        result.onReloadData();
    }

    return Object.assign(result, {
        onEdit, onDelete,
    }) as IUseTableResult<E, S>;
}
