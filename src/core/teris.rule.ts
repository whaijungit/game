import gameConfig from './game.config';
import { Rectangle } from './teris.rect';
import { TerisGroup } from './teris.group';
import { isPoint } from '../common/isPoint';
import { IPoint, MoveDirection, Shape } from '../common/interfaces';

export class TerisRule {
    static canIMove(shape: Shape, targetPoint: IPoint, exists: Rectangle[]): boolean {
        const targetRectPoints: IPoint[] = shape.map(it => ({ x: it.x + targetPoint.x, y: it.y + targetPoint.y }))
        let result = targetRectPoints.some(p => {
            return p.x < 0 || p.x > gameConfig.panelSize.width - 1 || p.y < 0 || p.y > gameConfig.panelSize.height - 1
        })
        if (result) {
            return false
        }
        result = targetRectPoints.some(p => exists.some(rect => rect.point.x === p.x && rect.point.y === p.y))
        if (result) {
            return false
        }
        return true
    }
    static move(teris: TerisGroup, targetPointOrDeirection: IPoint, exists: Rectangle[]): boolean
    static move(teris: TerisGroup, targetPointOrDeirection: MoveDirection, exists: Rectangle[]): boolean
    static move(teris: TerisGroup, targetPointOrDeirection: IPoint | MoveDirection, exists: Rectangle[]): boolean {
        if (isPoint(targetPointOrDeirection)) {
            if (this.canIMove(teris.shape, targetPointOrDeirection, exists)) {
                teris.centerPoint = targetPointOrDeirection
                return true
            }
            return false
        } else {
            const direction = targetPointOrDeirection
            let targetPoint: IPoint
            switch (direction) {
                case MoveDirection.right:
                    targetPoint = {
                        x: teris.centerPoint.x + 1,
                        y: teris.centerPoint.y
                    }
                    break
                case MoveDirection.down:
                    targetPoint = {
                        x: teris.centerPoint.x,
                        y: teris.centerPoint.y + 1
                    }
                    break;
                case MoveDirection.left:
                    targetPoint = {
                        x: teris.centerPoint.x - 1,
                        y: teris.centerPoint.y
                    }
                    break
            }
            return this.move(teris, targetPoint, exists)
        }
    }
    static moveDirectly(teris: TerisGroup, direction: MoveDirection, exists: Rectangle[]) {
        while (this.move(teris, direction, exists)) { }
    }
    static rotate(teris: TerisGroup, exists: Rectangle[]): boolean {
        const shape = teris.afterRotateShape()
        if (this.canIMove(shape, teris.centerPoint, exists)) {
            teris.rotate()
            return true
        }
        return false
    }
    static deleteTeris(exists: Rectangle[]): number {
        const ys = exists.map(r => r.point.y)
        const maxY = Math.max(...ys)
        const minY = Math.min(...ys)
        let n = 0
        for (let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y)) {
                n++
            }
        }
        return n
    }

    private static deleteLine(exists: Rectangle[], y: number): boolean {
        const teris = exists.filter(r => r.point.y === y)
        if (teris.length === gameConfig.panelSize.width) {
            teris.forEach(r => {
                r.view?.remove()
                
                const index = exists.indexOf(r)
                exists.splice(index, 1)
            })
            exists.filter(rect => rect.point.y < y).forEach((r) => {
                r.point = {
                    x: r.point.x,
                    y: r.point.y + 1
                }
            })
            return true
        }
        return false
    }
}