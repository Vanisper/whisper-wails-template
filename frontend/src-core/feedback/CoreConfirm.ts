import { ElMessageBox } from 'element-plus'
import { CoreFeedbackType } from '../enum/CoreFeedbackType'
import { CoreAlert } from './CoreAlert'

/**
 * #  确认弹窗类
 * 可通过 ```.create()``` 方法创建自定义实例
 * @author Hamm
 */
export class CoreConfirm extends CoreAlert {
  /**
   * # 设置取消按钮文字
   * @param cancelText 取消按钮文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * # 启用ESC关闭
   */
  enableEscClose(): this {
    this.isCloseByEscape = true
    return this
  }

  /**
   * # 启用遮罩层关闭
   */
  enableCoverClose(): this {
    this.isCloseByCover = true
    return this
  }

  /**
   * # 显示成功图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  success(content: string, title?: string): Promise<void> {
    this.icon = CoreFeedbackType.SUCCESS
    return this.show(content, title)
  }

  /**
   * # 显示警告图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  warning(content: string, title?: string): Promise<void> {
    this.icon = CoreFeedbackType.WARNING
    return this.show(content, title)
  }

  /**
   * # 显示错误图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  error(content: string, title?: string): Promise<void> {
    this.icon = CoreFeedbackType.ERROR
    return this.show(content, title)
  }

  /**
   * # 显示消息图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  info(content: string, title?: string): Promise<void> {
    this.icon = CoreFeedbackType.INFO
    return this.show(content, title)
  }

  /**
   * # 显示无图标确认弹窗
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  show(content: string, title = '操作提醒'): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      ElMessageBox.confirm(
        content,
        title,
        this.getConfig(),
      )
        .then(() => {
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }

  /**
   * # 创建实例方法
   */
  static create(): CoreConfirm {
    return new CoreConfirm()
  }

  /**
   * # 显示成功图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  static success(content: string, title?: string): Promise<void> {
    return this.create().success(content, title)
  }

  /**
   * # 显示警告图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  static warning(content: string, title?: string): Promise<void> {
    return this.create().warning(content, title)
  }

  /**
   * # 显示错误图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  static error(content: string, title?: string): Promise<void> {
    return this.create().error(content, title)
  }

  /**
   * # 显示消息图标的确认框
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  static info(content: string, title?: string): Promise<void> {
    return this.create().info(content, title)
  }

  /**
   * # 显示无图标确认弹窗
   * @param content 确认内容
   * @param title [可选] 确认标题
   */
  static show(content: string, title?: string): Promise<void> {
    return this.create().show(content, title)
  }
}
