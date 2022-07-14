import { Rectangle } from './teris.rect';
import { IPoint, Shape } from '../common/interfaces';
declare abstract class TerisGroup {
    private _shape;
    private _centerPoint;
    private _color;
    private terisGroups;
    protected clock: boolean;
    get teris(): readonly Rectangle[];
    get centerPoint(): IPoint;
    get shape(): Shape;
    set centerPoint(point: IPoint);
    private setGroupsCenterPoint;
    constructor(_shape: Shape, _centerPoint: IPoint, _color: string);
    afterRotateShape(): Shape;
    rotate(): void;
}
export { TerisGroup };
