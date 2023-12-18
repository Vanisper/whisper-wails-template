/* eslint-disable @typescript-eslint/no-explicit-any */
import { CoreConfig } from './CoreConfig'
import { IJson } from '../interface/IJson'
import { CoreStore } from '../store/CoreStore'

/**
 * # 一些全局使用的扩展方法
 * @author Hamm
 */
declare global {
    interface Window {
        airConfig(): void
    }
}

Window.prototype.airConfig = () => {
    // eslint-disable-next-line no-console
    console.clear()
    const airConfig: IJson = {}
    Object.keys(CoreConfig).forEach((item) => {
        airConfig[item] = (CoreConfig as any)[item]
    })
    // eslint-disable-next-line no-console
    console.table(airConfig, ['value'])
}

document.onkeydown = (e: KeyboardEvent) => {
    if (e.key === 'Meta' || e.key === 'Alt') {
        CoreStore().controllKeyDown = true
    }
    if (e.key === 'Escape') {
        CoreStore().escKeyDown = true
    }
}

document.onkeyup = (e: KeyboardEvent) => {
    if (e.key === 'Meta' || e.key === 'Alt') {
        CoreStore().controllKeyDown = false
    }
    if (e.key === 'Escape') {
        CoreStore().escKeyDown = false
    }
}
