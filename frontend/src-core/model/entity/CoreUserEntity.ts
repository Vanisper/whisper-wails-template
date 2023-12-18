import { IUser } from '../../interface/IUser'
import { CoreEntity } from '../../base/CoreEntity'

/**
 * # 内置用户实体
 * ---
 * 💡 如需扩展, 请自行实现 ```IUser```, 使用 ```CoreConfig.userEntityClass``` 配置默认实现类
 * @author Hamm
 */
export class CoreUserEntity extends CoreEntity implements IUser {
  /**
   * # 用户昵称
   */
  nickname!: string

  /**
   * # 用户头像
   */
  avatar!: string
}
