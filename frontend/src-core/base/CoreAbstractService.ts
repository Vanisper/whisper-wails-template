/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref } from 'vue'
import { CoreHttp } from '../helper/CoreHttp'
import { CoreModel } from './CoreModel'

/**
 * # API服务超类
 * @author Hamm
 */
export abstract class CoreAbstractService extends CoreModel {
    /**
     * # API目录地址
     * ---
     * ### 💡 一般对应后端的分组/控制器/目录等
     */
    abstract baseUrl: string

    /**
     * # Loading的ref对象
     * ---
     * ### 💡 你可以将这个传入的对象绑定到你需要Loading的DOM上
     */
    loading!: Ref<boolean>

    /**
     * # 获取一个API服务实例
     * @param loading [可选]Loading的Ref对象
     */
    constructor(loading?: Ref<boolean>) {
        super()
        if (loading) {
            this.loading = loading
        }
    }

    /**
     * # 创建一个CoreHttp实例
     * @param url 请求的接口地址
     * @param baseUrl [可选] 请求的接口目录
     */
    api(url: string, baseUrl?: string): CoreHttp {
        if (baseUrl) {
            url = `${baseUrl}/${url}`
        } else {
            url = `${this.baseUrl}/${url}`
        }
        if (this.loading) {
            return CoreHttp.create(url).setLoading(this.loading)
        }
        return CoreHttp.create(url)
    }

    /**
     * # 静态创建一个API服务实例
     * @param loading [可选]Loading的Ref对象
     */
    static create<S extends CoreAbstractService>(this: new () => S, loading?: Ref<boolean>): S {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const service = Object.assign(new this()) as S
        if (loading) {
            service.loading = loading
        }
        return service
    }
}
