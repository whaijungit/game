import gameConfig from './game.config';
import { isPoint } from '../common/isPoint';
import { MoveDirection } from '../common/interfaces';
export class TerisRule {
    static canIMove(shape, targetPoint, exists) {
        const targetRectPoints = shape.map(it => ({ x: it.x + targetPoint.x, y: it.y + targetPoint.y }));
        let result = targetRectPoints.some(p => {
            return p.x < 0 || p.x > gameConfig.panelSize.width - 1 || p.y < 0 || p.y > gameConfig.panelSize.height - 1;
        });
        if (result) {
            return false;
        }
        result = targetRectPoints.some(p => exists.some(rect => rect.point.x === p.x && rect.point.y === p.y));
        if (result) {
            return false;
        }
        return true;
    }
    static move(teris, targetPointOrDeirection, exists) {
        if (isPoint(targetPointOrDeirection)) {
            if (this.canIMove(teris.shape, targetPointOrDeirection, exists)) {
                teris.centerPoint = targetPointOrDeirection;
                return true;
            }
            return false;
        }
        else {
            const direction = targetPointOrDeirection;
            let targetPoint;
            switch (direction) {
                case MoveDirection.right:
                    targetPoint = {
                        x: teris.centerPoint.x + 1,
                        y: teris.centerPoint.y
                    };
                    break;
                case MoveDirection.down:
                    targetPoint = {
                        x: teris.centerPoint.x,
                        y: teris.centerPoint.y + 1
                    };
                    break;
                case MoveDirection.left:
                    targetPoint = {
                        x: teris.centerPoint.x - 1,
                        y: teris.centerPoint.y
                    };
                    break;
            }
            return this.move(teris, targetPoint, exists);
        }
    }
    static moveDirectly(teris, direction, exists) {
        while (this.move(teris, direction, exists)) { }
    }
    static rotate(teris, exists) {
        const shape = teris.afterRotateShape();
        if (this.canIMove(shape, teris.centerPoint, exists)) {
            teris.rotate();
            return true;
        }
        return false;
    }
    static deleteTeris(exists) {
        const ys = exists.map(r => r.point.y);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        let n = 0;
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y)) {
                n++;
            }
        }
        return n;
    }
    static deleteLine(exists, y) {
        const teris = exists.filter(r => r.point.y === y);
        console.log(teris.length, gameConfig.panelSize.width);
        if (teris.length === gameConfig.panelSize.width) {
            teris.forEach(r => {
                var _a;
                (_a = r.view) === null || _a === void 0 ? void 0 : _a.remove();
                const index = exists.indexOf(r);
                exists.splice(index, 1);
            });
            exists.filter(rect => rect.point.y < y).forEach((r) => {
                r.point = {
                    x: r.point.x,
                    y: r.point.y + 1
                };
            });
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=teris.rule.js.map