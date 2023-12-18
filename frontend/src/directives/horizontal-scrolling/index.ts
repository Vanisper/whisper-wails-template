import { HorizontalScrolling } from '@/utils/horizontal-scrolling';
import { Directive } from 'vue';

// 创建一个 WeakMap 来存储 HorizontalScrolling 实例
const horizontalScrollings = new WeakMap();

const horizontalScrollingDirective: Directive<HTMLElement> = {
    // 当绑定元素插入到 DOM 中时……
    mounted(el) {
        const horizontalScrolling = new HorizontalScrolling(el);
        // 将 HorizontalScrolling 实例保存到 WeakMap 中
        horizontalScrollings.set(el, horizontalScrolling);
    },
    // 当指令从绑定的元素上解绑时……
    unmounted(el) {
        // 从 WeakMap 中获取 HorizontalScrolling 实例
        const horizontalScrolling = horizontalScrollings.get(el);
        horizontalScrolling?.destroy();
        // 从 WeakMap 中移除 HorizontalScrolling 实例
        horizontalScrollings.delete(el);
    }
};

export default horizontalScrollingDirective;