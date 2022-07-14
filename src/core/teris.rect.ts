import { IPoint, IViewer, Size } from '../common/interfaces'

class Rectangle {
    set point(point) {
        if (point) {
            if (this.point.x === point.x && this.point.y === point.y) {
                return
            }
            this._point = point
            this.view?.show()
        }
    }
    get point() {
        return this._point
    }
    set view(view) {
        if (view) {
            this._view = view
            this.view!.show()
        }
    }
    get view() {
        return this._view
    }
    set color(color) {
        this._color = color
    }
    get color() {
        return this._color
    }
    set size(size) {
        this._size = size
    }
    get size() {
        return this._size
    }
    constructor(private _point: IPoint, private _view?: IViewer, private _color?: string, private _size?: Size) { }
}


export { Rectangle }