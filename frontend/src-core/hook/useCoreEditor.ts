import { Ref, computed, ref } from 'vue'
import { CoreFormInstance } from '../type/CoreType'
import { ClassConstructor } from '../type/ClassConstructor'
import { CoreClassTransformer } from '../helper/CoreClassTransformer'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'
import { CoreEntity } from '../base/CoreEntity'
import { IUseEditorOption } from '../interface/IUseEditorOption'
import { IUseEditorResult } from '../interface/IUseEditorResult'
import { useCoreDetail } from './useCoreDetail'
import { IJson } from '../interface/IJson'

/**
 * # 引入Editor的Hook
 * @param props defineProps的返回值
 * @param entityClass Editor使用的实体类
 * @param serviceClass Editor使用的Service
 * @param option [可选]更多的配置
 */
export function useCoreEditor<E extends CoreEntity, S extends CoreAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseEditorOption<E> = {}): IUseEditorResult<E, S> {
  const result = useCoreDetail(props, entityClass, serviceClass, option)

  const rules = result.service.createValidator(props.param, option.customRules || {})

  const formRef = ref<CoreFormInstance>() as Ref<CoreFormInstance>

  async function onSubmit() {
    let postData = CoreClassTransformer.copy(result.formData.value, entityClass)
    if (option.beforeSubmit) {
      const result = option.beforeSubmit(postData)
      if (result === null) {
        return
      }
      postData = result
    }
    const id = await result.service.save(postData, option.successMessage || (postData.id ? `修改${result.formData.value.getClassName()}成功` : `添加${result.formData.value.getClassName()}成功`))
    props.onConfirm(id)
  }

  const title = computed(() => ((result.formData.value.id ? '修改' : '新增') + result.formData.value.getClassName()))

  return Object.assign(result, {
    title, formRef, rules, onSubmit,
  }) as IUseEditorResult<E, S>
}
