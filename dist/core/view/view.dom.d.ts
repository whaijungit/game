import { Rectangle } from '../teris.rect';
import { IViewer } from '../../common/interfaces';
declare class PageViewerRectangle implements IViewer {
    private rect;
    private container;
    private dom;
    private isRemove;
    constructor(rect: Rectangle, container?: HTMLElement);
    show(): void;
    remove(): void;
}
export { PageViewerRectangle };
