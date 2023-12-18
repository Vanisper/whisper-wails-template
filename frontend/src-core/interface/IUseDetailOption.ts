/* eslint-disable no-unused-vars */

import { CoreEntity } from '../base/CoreEntity'

/**
 * # Detail的Hook可选配置
 */
export interface IUseDetailOption<E extends CoreEntity> {

    /**
     * # 查到详情后的事件
     * ---
     * 💡 参数为响应的数据,请处理后返回
     *
     * @param detailData 实体
     */
    afterGetDetail?: (detailData: E) => E | void

}
