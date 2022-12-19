import {
  Component,
  Input,
  ContentChildren,
  AfterViewChecked,
  ElementRef,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import { getRtlScrollAxisType, RtlScrollAxisType } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { HorizontalSliderAdapter, SliderAdapter } from '../slider.adapter';
import { CarouselPageTemplate } from '../carousel-page-template/carousel-page-template';
import { BezierEasingOptions, SmoothScrollManager, SmoothScrollToOptions } from '../../../smooth-scroll';

@Component({
  host: {
    '[attr.orientation]': 'orientation',
    '[attr.centralized]': 'isCentralized'
  },
  selector: 'carousel-viewport',
  template: `
    <div class="g-slider-content">
      <ng-content></ng-content>
    </div>`,
  styleUrls: ['./carousel-viewport.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselViewport implements AfterViewChecked {

  _isPanning: boolean;

  get isCentralized(): boolean {
    return this.itemSize === 'auto' || this.adapter.isContentLessThanContainer || this.centralized;
  }

  get el(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @Input() easing: BezierEasingOptions = {
    x1: 0.42,
    y1: 0,
    x2: 0.58,
    y2: 1
  };
  @Input() duration: number = 468;

  @Input() centralized: boolean;

  @Input() itemSize: number | string | 'auto';

  @Input() orientation: 'horizontal' | 'vertical';

  @Input() adapter: SliderAdapter = new HorizontalSliderAdapter(this.el);

  @ContentChildren(CarouselPageTemplate) items = new QueryList<CarouselPageTemplate>();

  constructor(private elementRef: ElementRef, private dir: Directionality, private smoothScroll: SmoothScrollManager) {
  }

  ngAfterViewChecked(): void {
    if (this.isCentralized) {
      this.el.style.setProperty('--slider-centralize-start-size', `${ this.adapter.getCentralizerStartSize() }px`);
      this.el.style.setProperty('--slider-centralize-end-size', `${ this.adapter.getCentralizerEndSize() }px`);
    }
  }

  scrollToIndex(value: number, behavior: ScrollBehavior): void {
    this.el.style.scrollSnapType = 'unset';
    const el: HTMLElement = this.items.get(value)?.element;

    if (el) {
      this.el.classList.add('g-scrolling');
      const pos: SmoothScrollToOptions = this.adapter.getScrollToValue(el, behavior || 'smooth', this.duration, this.easing);
      // const index: number = +el.getAttribute('galleryIndex');

      this.smoothScroll.scrollTo(this.el, pos).then(() => {
        // Reset viewport properties on scroll end
        this._isPanning = false;
        this.el.classList.remove('g-scrolling');
        this.el.style.scrollSnapType = this.adapter.scrollSnapType;
      });
    }
  }

  scrollToOffset(offset: number, e: any, behavior: ScrollBehavior): void {
    this.el.scrollTo(this.adapter.getPanValue(offset, e, behavior));
  }

  measureScrollOffset(from?: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end'): number {
    const LEFT = 'left';
    const RIGHT = 'right';
    const el = this.el;
    if (from == 'top') {
      return el.scrollTop;
    }
    if (from == 'bottom') {
      return el.scrollHeight - el.clientHeight - el.scrollTop;
    }

    // Rewrite start & end as left or right offsets.
    const isRtl = this.dir && this.dir.value == 'rtl';
    if (from == 'start') {
      from = isRtl ? RIGHT : LEFT;
    } else if (from == 'end') {
      from = isRtl ? LEFT : RIGHT;
    }

    if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
      // For INVERTED, scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and
      // 0 when scrolled all the way right.
      if (from == LEFT) {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      } else {
        return el.scrollLeft;
      }
    } else if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
      // For NEGATED, scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and
      // 0 when scrolled all the way right.
      if (from == LEFT) {
        return el.scrollLeft + el.scrollWidth - el.clientWidth;
      } else {
        return -el.scrollLeft;
      }
    } else {
      // For NORMAL, as well as non-RTL contexts, scrollLeft is 0 when scrolled all the way left and
      // (scrollWidth - clientWidth) when scrolled all the way right.
      if (from == LEFT) {
        return el.scrollLeft;
      } else {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      }
    }
  }

  dismissOngoingScroll(): void {
    this.smoothScroll.dismissOngoingScroll(this.el);
  }
}
