import { FieldName, Type } from '../decorator/Custom';
import { IEntity } from '../interface/IEntity';
import { CoreModel } from './CoreModel';

/**
 * # 实体超类
 * @author Hamm
 */
export class CoreEntity extends CoreModel implements IEntity {
    @Type(Number)
    @FieldName('ID') id!: number;

    /**
     * # 实例化一个实体
     * @param id [可选] 主键ID
     */
    constructor(id?: number) {
        super();
        if (id) {
            this.id = id;
        }
    }
}
