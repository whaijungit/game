import { Rectangle } from './teris.rect';
class TerisGroup {
    constructor(_shape, _centerPoint, _color) {
        this._shape = _shape;
        this._centerPoint = _centerPoint;
        this._color = _color;
        this.terisGroups = [];
        this.clock = true; // 旋转方向
        const arr = [];
        this._shape.forEach(point => {
            const rect = new Rectangle(point);
            rect.color = this._color;
            arr.push(rect);
        });
        this.terisGroups = arr;
        this.setGroupsCenterPoint();
    }
    get teris() {
        return this.terisGroups;
    }
    get centerPoint() {
        return this._centerPoint;
    }
    get shape() {
        return this._shape;
    }
    set centerPoint(point) {
        this._centerPoint = point;
        this.setGroupsCenterPoint();
    }
    setGroupsCenterPoint() {
        this._shape.forEach((point, index) => {
            this.teris[index].point = {
                x: this._centerPoint.x + point.x,
                y: this._centerPoint.y + point.y
            };
        });
    }
    afterRotateShape() {
        if (this.clock) {
            return this.shape.map(point => {
                const newPoint = {
                    x: -point.y,
                    y: point.x
                };
                return newPoint;
            });
        }
        else {
            return this.shape.map(point => {
                const newPoint = {
                    x: point.y,
                    y: -point.x
                };
                return newPoint;
            });
        }
    }
    rotate() {
        this._shape = this.afterRotateShape();
        this.setGroupsCenterPoint();
    }
}
export { TerisGroup };
//# sourceMappingURL=teris.group.js.map