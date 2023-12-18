import { CoreModel } from '../base/CoreModel'
import { Type } from '../decorator/Custom'

/**
 * # 分页类
 * @author Hamm
 */
export class CorePage extends CoreModel {
    /**
     * # 分页页数
     */
    @Type(Number) pageNum = 1

    /**
     * # 每页数量
     */
    @Type(Number) pageSize = 20
}
