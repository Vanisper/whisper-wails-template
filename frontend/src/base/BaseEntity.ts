import { FormField } from '@core/decorator/FormField';
import { TableField } from '@core/decorator/TableField';
import { EntityConfig } from '@core/decorator/EntityConfig';
import { CoreDateTimeFormatter } from '@core/enum/CoreDateTimeFormatter';
import { DisableDictionary } from '@/model/DisableDictionary';
import {
    ClassName, Dictionary, FieldName, Type,
} from '@core/decorator/Custom';
import { CoreEntity } from '@core/base/CoreEntity';
import { SearchField } from '@core/decorator/SearchField';
import { CoreSearchDataType } from '@core/enum/CoreSearchDataType';

/**
 * # 数据库实体基类
 * @author Hamm
 */
@EntityConfig({})
@ClassName('记录')
export class BaseEntity extends CoreEntity {
  @FieldName('创建时间')
  @TableField({
      width: 170,
      orderNumber: -99,
      dateTimeFormatter: CoreDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
  })
  @Type(Number) createTime!: number;

  @FieldName('状态')
  @SearchField({
      orderNumber: -100,
  })
  @Dictionary(DisableDictionary)
  @TableField({
      showColor: true,
      width: 80,
      orderNumber: -100,
      removed: true,
  })
  @Type(Boolean) isDisabled!: boolean;

  @FieldName('备注')
  @SearchField({
      orderNumber: -100,
      dataType: CoreSearchDataType.TEXTAREA,
  })
  @FormField({
      textarea: true,
      orderNumber: -100,
  })
  @Type(String) remark!: string;
}
