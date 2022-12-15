import { Component, Optional, Inject, ElementRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { CAROUSEL_CONFIG, CarouselBehavior, CarouselConfig } from '../carousel.model';
import { CarouselCore } from '../core/carousel-core';

@Component({
  host: {
    '[style.height.px]': 'itemCrossSize'
  },
  exportAs: 'carousel',
  selector: 'carousel',
  templateUrl: 'carousel.html',
  styleUrls: ['./carousel.scss'],
  providers: [{ provide: CarouselCore, useExisting: Carousel }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel extends CarouselCore {

  @Input() itemSize: number | string | 'auto';

  @Input() itemCrossSize: string | number | 'auto';

  @Input() centralized: boolean;

  constructor(@Optional() @Inject(CAROUSEL_CONFIG) protected customConfig: CarouselConfig, el: ElementRef) {
    super(customConfig, el);
  }

  /**
   * Go to page by index
   */
  setPage(index: number, behavior?: CarouselBehavior) {
    this.carouselRef.setPage({ index, behavior });
  }

  /**
   * Go to item by index
   */
  setItem(index: number, behavior?: CarouselBehavior) {
    this.carouselRef.setItem({ index, behavior });
  }

  /**
   * Go to next page
   */
  nextPage(behavior?: CarouselBehavior) {
    this.carouselRef.nextPage(behavior);
  }

  /**
   * Go to prev page
   */
  prevPage(behavior?: CarouselBehavior) {
    this.carouselRef.prevPage(behavior);
  }

  /**
   * Go to next item
   */
  nextItem(behavior?: CarouselBehavior) {
    this.carouselRef.nextItem(behavior);
  }

  /**
   * Go to prev item
   */
  prevItem(behavior?: CarouselBehavior) {
    this.carouselRef.prevItem(behavior);
  }

}
