import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService';
import { CoreNotification } from '../feedback/CoreNotification';
import { CoreClassTransformer } from '../helper/CoreClassTransformer';
import { CoreDialog } from '../helper/CoreDialog';
import { ITree } from '../interface/ITree';
import { IUseTableTreeOption } from '../interface/IUseTableTreeOption';
import { IUseTableTreeResult } from '../interface/IUseTableTreeResult';
import { ClassConstructor } from '../type/ClassConstructor';
import { useCoreTable } from './useCoreTable';

/**
 * # 引入表格树使用的Hook
 * @param entityClass 实体类
 * @param serviceClass 表格使用的Service类
 * @param option [可选] 更多配置
 */
export function useCoreTableTree<E extends ITree, S extends CoreAbstractEntityService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseTableTreeOption<E> = {}): IUseTableTreeResult<E, S> {
    option.unPaginate = true;
    const result = useCoreTable(entityClass, serviceClass, option);
    async function onAddRow(row: E) {
        if (!option.editView) {
            CoreNotification.warning('请为 useCoreTableList 的 option 传入 editor');
            return;
        }
        try {
            let param = CoreClassTransformer.newInstance(entityClass);
            param.parentId = row.id;
            if (option.beforeAddRow) {
                const result = option.beforeAddRow(param, row);
                if (result !== undefined) {
                    param = result;
                }
            }
            await CoreDialog.show(option.editView, param);
        } finally {
            result.onReloadData();
        }
    }
    return Object.assign(result, {
        onAddRow,
    }) as IUseTableTreeResult<E, S>;
}
