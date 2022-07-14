import { IPoint } from './interfaces';
import { TerisGroup } from '../core/teris.group';
export declare function getRandom(min: number, max: number): number;
declare class TShape extends TerisGroup {
    constructor(_centerPoint: IPoint, _color: string);
}
export declare const shapes: (typeof TShape)[];
export declare const colors: string[];
export {};
