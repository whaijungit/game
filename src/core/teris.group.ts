import { Rectangle } from './teris.rect'
import { IPoint, Shape } from '../common/interfaces'

abstract class TerisGroup {
    
    private terisGroups: readonly Rectangle[] = []
    
    protected clock: boolean = true // 旋转方向
    
    get teris() {
        return this.terisGroups
    }

    get centerPoint() {
        return this._centerPoint
    }

    get shape() {
        return this._shape
    }

    set centerPoint(point) {
        this._centerPoint = point
        this.resetGroupsCenterPoint()
    }

    private resetGroupsCenterPoint() {
        this._shape.forEach((point, index) => {
            this.teris[index].point = {
                x: this._centerPoint.x + point.x,
                y: this._centerPoint.y + point.y
            }
        })
    }

    constructor(private _shape: Shape, private _centerPoint: IPoint, private _color: string) {
        const arr: Rectangle[] = []
        this._shape.forEach(point => {
            const rect = new Rectangle(point)
            rect.color = this._color
            arr.push(rect)
        })
        this.terisGroups = arr
        this.resetGroupsCenterPoint()
    }

    afterRotateShape():Shape {
        if (this.clock) {
            return this.shape.map(point => {
                const newPoint: IPoint = {
                    x: -point.y,
                    y: point.x
                }
                return newPoint
            })
        }
        else {
            return this.shape.map(point => {
                const newPoint: IPoint = {
                    x: point.y,
                    y: -point.x
                }
                return newPoint
            })
        }

    }

    rotate() {
        this._shape = this.afterRotateShape()
        this.resetGroupsCenterPoint()
    }
}

export { TerisGroup }