import { Rectangle } from '../teris.rect';
import { IViewer } from '../../common/interfaces';

class PageViewerRectangle implements IViewer {
    private dom: HTMLElement | null = null
    private isRemove: boolean = false
    constructor(private rect: Rectangle, private container: HTMLElement = document.body) {
        this.rect = rect
        this.container = container
    }
    show(): void {
        const width = this.rect.size?.width ?? 30
        const height = this.rect.size?.height ?? 30
        const color = this.rect.color ?? 'red'
        if (this.isRemove) {
            return
        }
        if (!this.dom) {
            this.dom = document.createElement('div')
            this.dom.className = 'rect'
            this.dom.style.background = color
            this.dom.style.width = `${width}px`
            this.dom.style.position = 'absolute'
            this.dom.style.height = `${height}px`
        }
        this.dom.style.left = this.rect.point.x * width + 'px'
        this.dom.style.top = this.rect.point.y * height + 'px'
        this.container.appendChild(this.dom)
    }
    remove(): void {
        if (this.dom) {
            this.dom.remove()
            this.dom = null
            this.isRemove = true
        }
    }
}

export { PageViewerRectangle }