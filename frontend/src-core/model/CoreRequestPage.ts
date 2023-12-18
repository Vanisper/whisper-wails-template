import { CoreEntity } from '../base/CoreEntity'
import { Type } from '../decorator/Custom'
import { CorePage } from './CorePage'
import { CoreRequest } from './CoreRequest'

/**
 * # 请求分页类
 * @author Hamm
 */
export class CoreRequestPage<E extends CoreEntity> extends CoreRequest<E> {
    /**
     * # 分页信息
     */
    @Type(CorePage) page = new CorePage()
}
