// import { Component, ElementRef, ChangeDetectionStrategy, Optional, Inject } from '@angular/core';
// import { CAROUSEL_CONFIG, CAROUSEL_ORIENTATION, CarouselConfig, CarouselOrientation } from '../carousel.model';
// import { CentralisedCarousel } from './centralised-carousel';
//
// @Component({
//   host: {
//     '[style.width.%]': '100',
//     '[style.height.px]': 'itemHeight'
//   },
//   selector: 'horizontal-centralised-carousel',
//   templateUrl: './centralised-carousel.html',
//   styleUrls: ['./centralised-carousel.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class HorizontalCentralisedCarousel extends CentralisedCarousel {
//
//   get itemInlineSize(): number {
//     return this.itemWidth;
//   }
//
//   orientation: CarouselOrientation = CAROUSEL_ORIENTATION.Horizontal;
//
//   constructor(@Optional() @Inject(CAROUSEL_CONFIG) customConfig: CarouselConfig, protected el: ElementRef) {
//     super(customConfig, el);
//   }
//
//   protected getContainerStyles(totalCount: number): any {
//     return {
//       width: `${ this.getDisplayedSize(totalCount) }px`,
//       height: `${ this.itemHeight }px`
//     };
//   }
//
//   protected getTransformValue(value: number): any {
//     return { transform: `translate3d(${ value }px, 0, 0)` };
//   }
//
//   protected getDisplayedSize(totalCount: number): number {
//     const displayedCount: number = Math.min(this.maxShownItems, totalCount) || totalCount;
//     return Math.min(displayedCount * this.itemWidth, this.el.nativeElement.clientWidth);
//   }
// }
