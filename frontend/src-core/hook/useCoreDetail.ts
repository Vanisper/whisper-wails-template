import { Ref, computed, ref } from 'vue'
import { IUseDetailOption } from '../interface/IUseDetailOption'
import { IUseDetailResult } from '../interface/IUseDetailResult'
import { CoreEntity } from '../base/CoreEntity'
import { ClassConstructor } from '../type/ClassConstructor'
import { CoreAbstractEntityService } from '../base/CoreAbstractEntityService'
import { CoreClassTransformer } from '../helper/CoreClassTransformer'
import { IJson } from '../interface/IJson'

/**
 * # 引入详情的Hook
 * @param props defineProps的返回值
 * @param entityClass 详情使用的实体类
 * @param serviceClass 详情使用的Service
 * @param option [可选]更多的配置
 */
export function useCoreDetail<E extends CoreEntity, S extends CoreAbstractEntityService<E>>(props: IJson, entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option: IUseDetailOption<E> = {}): IUseDetailResult<E, S> {
  const isLoading = ref(false)

  const service = CoreClassTransformer.newInstance(serviceClass)
  service.loading = isLoading

  const formData: Ref<E> = ref(props.param ? props.param.copy() : CoreClassTransformer.newInstance(entityClass))

  async function getDetail() {
    if (props.param.id) {
      formData.value = await service.getDetail(props.param.id)

      if (option.afterGetDetail) {
        const result = option.afterGetDetail(formData.value)
        if (result !== undefined) {
          formData.value = result
        }
      }
    }
  }

  getDetail()

  const title = computed(() => `${formData.value.getClassName()}详情`)

  return {
    title, formData, isLoading, service, getDetail,
  } as IUseDetailResult<E, S>
}
