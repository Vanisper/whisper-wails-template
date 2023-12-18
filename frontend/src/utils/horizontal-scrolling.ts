// 横向滚动工具函数

export class HorizontalScrolling {
    public readonly target: HTMLElement | null;

    constructor(target: HTMLElement | null) {
        this.target = target;
        // 添加平滑样式 scroll-behavior:smooth 
        if (this.target) this.target.style.scrollBehavior = 'smooth';
        this.init();
    }

    private wheelHandler = (e: WheelEvent) => {
        // 阻止默认事件  防止其他滚动条滚动
        e.preventDefault();
        
        if (this.target) this.target.scrollLeft += e.deltaY;
    };

    // 滚动到最左边
    public scrollToStart() {
        if (this.target) this.target.scrollLeft = 0;
    }

    // 滚动到最右边
    public scrollToEnd() {
        if (this.target) this.target.scrollLeft = this.target.scrollWidth;
    }

    // 向左步进
    public stepLeft(step: number) {
        if (this.target) this.target.scrollLeft -= step;
    }

    // 向右步进
    public stepRight(step: number) {
        if (this.target) this.target.scrollLeft += step;
    }

    // 是否滚动到最左边
    public get isStart() {
        if (this.target) return this.target.scrollLeft === 0;
        return false;
    }

    // 是否滚动到最右边
    public get isEnd() {
        if (this.target) return this.target.scrollLeft === this.target.scrollWidth;
        return false;
    }

    public destroy() {
        if (this.target) this.target.removeEventListener('wheel', this.wheelHandler);
    }

    // 是否出现了横向滚动条
    public get isOverflow() {
        if (this.target) return this.target.scrollWidth > this.target.clientWidth;
        return false;
    }

    private init() {
        if (this.target) this.target.addEventListener('wheel', this.wheelHandler, { passive: true });
    }
}
