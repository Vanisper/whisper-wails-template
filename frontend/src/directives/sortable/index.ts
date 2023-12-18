import { Directive, DirectiveBinding } from 'vue';
import Sortable from 'sortablejs';


interface ISortableDirective {
    onStart?: (e: Sortable.SortableEvent) => void;
    onEnd?: (e: Sortable.SortableEvent) => void;
    onAdd?: (e: Sortable.SortableEvent) => void;
    // 多个列表之间拖拽
    group?: {
        // 组名
        name: string;
        // 多组之间 可以选择某一组不被拖进
        put?: boolean;
        pull?: string;
    };
    // 可以设定禁止排序
    sort?: boolean;
}

// 创建一个 WeakMap 来存储 Sortable 实例
const sortables = new WeakMap();

// 创建一个自定义指令
const sortableDirective: Directive<HTMLElement> = {
    // 当绑定元素插入到 DOM 中时……
    mounted(el, binding: DirectiveBinding<ISortableDirective>) {        
        // 创建一个新的 Sortable 实例
        // 生成options
        const options: any = {};
        if (binding.value?.group !== undefined) {
            options.group = binding.value.group;
        }
        if (binding.value?.sort !== undefined) {
            options.sort = binding.value.sort;
        }
        const sortable = new Sortable(el, {
            animation: 150,
            ...options,
            onStart: async (e) => {
                // 调用传入的方法
                binding.value?.onStart?.(e);
            },
            onEnd: async (e) => {
                // const { oldIndex, newIndex } = e;
                // if ((oldIndex === newIndex) || (oldIndex == undefined || newIndex == undefined)) return;
                // 调用传入的方法
                binding.value?.onEnd?.(e);
            },
            onAdd: async (e) => {
                // 调用传入的方法
                binding.value?.onAdd?.(e);
            }
        });
        // 将 Sortable 实例保存到 WeakMap 中
        sortables.set(el, sortable);
    },
    // 当指令从绑定的元素上解绑时……
    unmounted(el) {                
        // 从 WeakMap 中获取 Sortable 实例
        const sortable = sortables.get(el);
        sortable?.destroy();
        // 从 WeakMap 中移除 Sortable 实例
        sortables.delete(el);
    }
};

export default sortableDirective;