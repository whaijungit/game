import { IPoint } from './interfaces';

export function isPoint(object:any):object is IPoint {
    if (typeof object.x === 'undefined') {
        return false
    }
    return true
}