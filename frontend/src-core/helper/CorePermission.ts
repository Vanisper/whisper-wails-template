import { CorePermissionAction } from '../enum/CorePermissionAction'
import { getEntityConfig } from '../decorator/EntityConfig'
import { CoreConfig } from '../config/CoreConfig'
import { CoreEntity } from '../base/CoreEntity'
import { ClassConstructor } from '../type/ClassConstructor'

/**
 * # 权限标识处理类
 * @author Hamm
 */
export class CorePermission {
  /**
   * # 获取指定实体类在某个场景的权限标识字符串
   * @param EntityClass 实体类
   * @param action 权限场景
   */
  static getPermission(EntityClass: ClassConstructor<CoreEntity> | null | undefined, action: CorePermissionAction): string {
    if (!EntityClass) {
      return ''
    }
    const entityConfig = getEntityConfig(new EntityClass())
    if (!entityConfig) {
      return ''
    }
    if (CoreConfig.autoPermission) {
      // 自动处理权限
      if (!entityConfig.permissionPrefix) {
        // 没有配置前缀 从类中获取权限前缀
        const entityName = EntityClass.name.replace('Entity', '_').toString()
        entityConfig.permissionPrefix = entityName.slice(0, 1).toLocaleLowerCase() + entityName.slice(1)
      }
    } else {
      // 如不自动配置权限, 则将权限前缀清空
      entityConfig.permissionPrefix = ''
    }

    switch (action) {
      case CorePermissionAction.ADD:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.addPermission, action)
      case CorePermissionAction.DELETE:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.deletePermission, action)
      case CorePermissionAction.EDIT:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.editPermission, action)
      case CorePermissionAction.DETAIL:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.detailPermission, action)
      case CorePermissionAction.ADD_CHILD:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.addChildPermission, action)
      case CorePermissionAction.EXPORT:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.exportPermission, action)
      case CorePermissionAction.IMPORT:
        return entityConfig.permissionPrefix + this.getAutoPermissionFlag(entityConfig.importPermission, action)
      default:
    }
    return ''
  }

  /**
   * # 根据配置获取权限后缀
   *
   * - ```CoreConfig.autoPermission=false``` 只取 ```EntityConfig``` 配置的权限, 取不到则认为不校验权限
   * - ```CoreConfig.autoPermission=true```  取 ```EntityConfig``` 配置的权限, 取不到则按 ```action``` 自动取
   */
  private static getAutoPermissionFlag(permission: string | undefined, action: CorePermissionAction) {
    if (CoreConfig.autoPermission) {
      return permission || action
    }
    return permission || ''
  }
}
