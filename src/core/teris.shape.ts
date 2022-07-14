import { TerisGroup } from './teris.group'
import { IPoint } from '../common/interfaces'
import { colors, getRandom, shapes } from '../common/utils'


export const createTeris = (centerPoint: IPoint) :TerisGroup=> {
    let index = getRandom(0, shapes.length)
    const Shape = shapes[index]
    index = getRandom(0, colors.length)
    const color = colors[index]
    return new Shape(centerPoint, color)
}
