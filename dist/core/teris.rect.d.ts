import { IPoint, IViewer, Size } from '../common/interfaces';
declare class Rectangle {
    private _point;
    private _view?;
    private _color?;
    private _size?;
    set point(point: IPoint);
    get point(): IPoint;
    set view(view: IViewer | undefined);
    get view(): IViewer | undefined;
    set color(color: string | undefined);
    get color(): string | undefined;
    set size(size: Size | undefined);
    get size(): Size | undefined;
    constructor(_point: IPoint, _view?: IViewer | undefined, _color?: string | undefined, _size?: Size | undefined);
}
export { Rectangle };
