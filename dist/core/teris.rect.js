class Rectangle {
    constructor(_point, _view, _color, _size) {
        this._point = _point;
        this._view = _view;
        this._color = _color;
        this._size = _size;
    }
    set point(point) {
        var _a;
        if (point) {
            if (this.point.x === point.x && this.point.y === point.y) {
                return;
            }
            this._point = point;
            (_a = this.view) === null || _a === void 0 ? void 0 : _a.show();
        }
    }
    get point() {
        return this._point;
    }
    set view(view) {
        if (view) {
            this._view = view;
            this.view.show();
        }
    }
    get view() {
        return this._view;
    }
    set color(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
    set size(size) {
        this._size = size;
    }
    get size() {
        return this._size;
    }
}
export { Rectangle };
//# sourceMappingURL=teris.rect.js.map