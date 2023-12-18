import { BaseEntity } from './BaseEntity';
import { CoreHttp } from '@core/helper/CoreHttp';
import { CoreAbstractEntityService } from '@core/base/CoreAbstractEntityService';

/**
 * # 抽象服务基类
 * @author Hamm
 */
export abstract class AbstractBaseService<E extends BaseEntity> extends CoreAbstractEntityService<E> {
    api(url: string, baseUrl?: string | undefined): CoreHttp {
        return super.api(url, baseUrl)
            .addHttpHeader('hello', 'world');
    }
}
