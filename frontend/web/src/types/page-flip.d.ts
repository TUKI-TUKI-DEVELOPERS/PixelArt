declare module "page-flip" {
  export interface PageFlipOptions {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    startPage?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
  }

  export class PageFlip {
    constructor(container: HTMLElement, options: PageFlipOptions);
    loadFromHTML(elements: HTMLElement[]): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    flipNext(): void;
    flipPrev(): void;
    flip(pageNum: number): void;
    on(event: string, callback: (e: { data: unknown }) => void): void;
    destroy(): void;
  }
}
