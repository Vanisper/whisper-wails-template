import { CoreConfig } from '../config/CoreConfig'
import { CoreCode } from '../enum/CoreCode'
import { CoreNotification } from './CoreNotification'

/**
 * # 错误反馈
 * @anthor Hamm
 */
export class CoreError {
  /**
   * # 错误状态码 默认500
   */
  private code = CoreCode.ERROR

  /**
   * # 错误信息文本
   */
  private message = CoreConfig.errorMessage

  /**
   * # 实例一个错误提示框
   * @param error [可选]错误信息
   */
  // eslint-disable-next-line
  constructor(error?: any) {
    switch (typeof error) {
      case 'object':
        this.code = error?.code || CoreCode.ERROR
        this.message = (error as Error).message || '系统错误,请查看控制台错误信息'
        break
      case 'string':
        this.message = error
        break
      default:
    }
  }

  /**
   * # 创建实例方法
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create(error?: any): CoreError {
    return new CoreError(error)
  }

  /**
   * # 设置错误码
   * @param code 错误状态码
   */
  setCode(code: number): CoreError {
    this.code = code
    return this
  }

  /**
   * # 设置错误信息
   * @param message 错误信息
   */
  setMessage(message: string): CoreError {
    this.message = message
    return this
  }

  /**
   * # 显示错误信息提示
   */
  show(): void {
    new CoreNotification().setTitle(`发生错误(${this.code})`)
      .setMessage(this.message)
      .error()
  }

  /**
   *
   * @param message 错误信息
   * @param code [可选]错误代码
   */
  static show(message: string, code?: number): void {
    if (code) {
      return this.create().setCode(code)
        .setMessage(message)
        .show()
    }
    return this.create(message).show()
  }
}
