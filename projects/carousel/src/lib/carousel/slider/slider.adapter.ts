import { BezierEasingOptions, SmoothScrollOptions, SmoothScrollToOptions } from '../smooth-scroll';
import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';

declare let Hammer: any;
/**
 * A clone of HammerJs constants
 */
export const DIRECTION_LEFT = 2;
export const DIRECTION_RIGHT = 4;
export const DIRECTION_UP = 8;
export const DIRECTION_DOWN = 16;

export abstract class SliderAdapter {
  abstract scrollSnapType: string;
  abstract panDirection: number;
  readonly direction: number;
  readonly offsetKey: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end';
  abstract get clientSize(): number;
  abstract get crossSize(): number;

  abstract get scrollValue(): number;

  abstract get isContentLessThanContainer(): boolean;

  abstract getClientSize(el: HTMLElement): number;

  abstract getOffsetSize(el: HTMLElement): number;

  abstract getScrollToValue(el: HTMLElement, behavior: ScrollBehavior, duration?: number, easing?: BezierEasingOptions): SmoothScrollOptions;

  abstract getPanDelta(e): number;

  abstract getPanVelocity(e): number;

  abstract getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions;

  abstract getCentralizerStartSize(): number;

  abstract getCentralizerEndSize(): number;

  getItemSize(value: string | number | 'auto', cross?: boolean): string {
    if (value === 'auto') {
      return 'auto';
    }
    return coerceCssPixelValue(coerceNumberProperty(value, cross ? '100%' : this.clientSize));
  }
}


export class HorizontalSliderAdapter extends SliderAdapter {

  readonly scrollSnapType: string = 'x mandatory';
  readonly panDirection = DIRECTION_LEFT | DIRECTION_RIGHT;
  readonly direction = Hammer.DIRECTION_HORIZONTAL;

  readonly offsetKey: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end' = 'start';

  get isContentLessThanContainer(): boolean {
    return this.el.clientWidth >= this.el.firstElementChild.clientWidth;
  }

  get scrollValue(): number {
    return this.el.scrollLeft;
  }

  get clientSize(): number {
    return this.el.clientWidth;
  }

  get crossSize(): number {
    return this.el.clientHeight;
  }

  constructor(private el: HTMLElement) {
    super();
  }

  getClientSize(el: HTMLElement): number {
    return el.clientWidth;
  }

  getOffsetSize(el: HTMLElement): number {
    return el.offsetLeft;
  }

  getScrollToValue(el: HTMLElement, behavior: ScrollBehavior, duration: number, easing: BezierEasingOptions): SmoothScrollToOptions {
    const position = el.offsetLeft - ((this.clientSize - el.clientWidth) / 2);
    return {
      left: position,
      duration: behavior === 'smooth' ? duration : 0,
      behavior,
      easing
    };
  }

  getPanDelta(e): number {
    return e.deltaX;
  }

  getPanVelocity(e): number {
    return e.velocityX;
  }

  getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions {
    return {
      behavior,
      left: value - e.deltaX
    };
  }

  getCentralizerStartSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.el.firstElementChild.clientWidth;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.el.firstElementChild.firstElementChild?.clientWidth / 2);
  }

  getCentralizerEndSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.el.firstElementChild.clientWidth;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.el.firstElementChild.lastElementChild?.clientWidth / 2);
  }
}

export class VerticalSliderAdapter extends SliderAdapter {

  readonly scrollSnapType: string = 'y mandatory';

  readonly panDirection = DIRECTION_UP | DIRECTION_DOWN;
  readonly direction = Hammer.DIRECTION_VERTICAL;

  readonly offsetKey: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end' = 'top';

  get scrollValue(): number {
    return this.el.scrollTop;
  }

  get clientSize(): number {
    return this.el.clientHeight;
  }

  get crossSize(): number {
    return this.el.clientWidth;
  }

  get isContentLessThanContainer(): boolean {
    return this.el.clientHeight >= this.el.firstElementChild.clientHeight;
  }

  constructor(private el: Element) {
    super();
  }

  getScrollToValue(el: HTMLElement, behavior: ScrollBehavior, duration: number, easing: BezierEasingOptions): SmoothScrollToOptions {
    const position = el.offsetTop - ((this.clientSize - el.clientHeight) / 2);
    return {
      top: position,
      duration: behavior === 'smooth' ? duration : 0,
      behavior,
      easing
    };
  }

  getPanDelta(e): number {
    return e.deltaY;
  }

  getPanVelocity(e): number {
    return e.velocityY;
  }

  getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions {
    return {
      behavior,
      top: value - e.deltaY
    };
  }

  getClientSize(el: HTMLElement): number {
    return el.clientHeight;
  }

  getOffsetSize(el: HTMLElement): number {
    return el.offsetTop;
  }

  getCentralizerStartSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.el.firstElementChild.clientHeight;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.el.firstElementChild.firstElementChild?.clientHeight / 2);
  }

  getCentralizerEndSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.el.firstElementChild.clientHeight;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.el.firstElementChild.lastElementChild?.clientHeight / 2);
  }

  getItemWidth(value: string | number | 'auto'): string {
    if (!coerceBooleanProperty(value)) {
      return '100%';
    }
    if (value === 'auto') {
      return 'auto';
    }
    return coerceCssPixelValue(+value);
  }

  getItemHeight(value: string | number | 'auto'): string {
    if (value === 'auto') {
      return 'auto';
    }
    return coerceCssPixelValue(coerceBooleanProperty(value) ? +value : this.clientSize);
  }
}
