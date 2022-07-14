import { IPoint } from './interfaces';
import { TerisGroup } from '../core/teris.group';

export function getRandom(min: number, max: number) {
    const dis = max - min;
    return Math.floor(Math.random() * (dis + min))
}

class TShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: -1, y: 0, }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 },
        ], _centerPoint, _color)
    }
}


class LMirrorShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 2, y: 0, }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 },
        ], _centerPoint, _color)
    }
}

class SShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 0, y: 0, }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 },
        ], _centerPoint, _color)
    }

    rotate() {
        super.rotate()
        this.clock = !this.clock
    }
}

class SMirrorShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 0, y: 0, }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },
        ], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.clock = !this.clock
    }
}

class LShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: -2, y: 0, }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 },
        ], _centerPoint, _color)
    }
}

class RectShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: 0, y: 0, }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },
        ], _centerPoint, _color)
    }
    afterRotateShape() {
        return this.shape
    }
}

class LineShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string) {
        super([
            { x: -1, y: 0, }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
        ], _centerPoint, _color)
    }
    rotate() {
        super.rotate()
        this.clock = !this.clock
    }
}

export const shapes = [
    TShape,
    LShape,
    SShape,
    LineShape,
    RectShape,
    LMirrorShape,
    SMirrorShape,
]

export const colors = [
    '#f40',
    'blue',
    'green',
    'orange',
]