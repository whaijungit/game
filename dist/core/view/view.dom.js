class PageViewerRectangle {
    constructor(rect, container = document.body) {
        this.rect = rect;
        this.container = container;
        this.dom = null;
        this.isRemove = false;
        this.rect = rect;
        this.container = container;
    }
    show() {
        var _a, _b, _c, _d, _e;
        const width = (_b = (_a = this.rect.size) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 30;
        const height = (_d = (_c = this.rect.size) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 30;
        const color = (_e = this.rect.color) !== null && _e !== void 0 ? _e : 'red';
        if (this.isRemove) {
            return;
        }
        if (!this.dom) {
            this.dom = document.createElement('div');
            this.dom.className = 'rect';
            this.dom.style.background = color;
            this.dom.style.width = `${width}px`;
            this.dom.style.position = 'absolute';
            this.dom.style.height = `${height}px`;
        }
        this.dom.style.left = this.rect.point.x * width + 'px';
        this.dom.style.top = this.rect.point.y * height + 'px';
        this.container.appendChild(this.dom);
    }
    remove() {
        if (this.dom) {
            this.dom.remove();
            this.dom = null;
            this.isRemove = true;
        }
    }
}
export { PageViewerRectangle };
//# sourceMappingURL=view.dom.js.map