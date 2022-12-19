// import { Component, ElementRef, ChangeDetectionStrategy, Optional, Inject } from '@angular/core';
// import { CAROUSEL_CONFIG, CAROUSEL_ORIENTATION, CarouselConfig, CarouselOrientation } from '../carousel.model';
// import { CentralisedCarousel } from './centralised-carousel';
//
// @Component({
//   host: {
//     '[style.width.px]': 'itemWidth',
//     '[style.height.%]': '100'
//   },
//   selector: 'vertical-centralised-carousel',
//   templateUrl: './centralised-carousel.html',
//   styleUrls: ['./centralised-carousel.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class VerticalCentralisedCarousel extends CentralisedCarousel {
//
//   get itemInlineSize(): number {
//     return this.itemHeight;
//   }
//
//   orientation: CarouselOrientation = CAROUSEL_ORIENTATION.Vertical;
//
//   constructor(@Optional() @Inject(CAROUSEL_CONFIG) customConfig: CarouselConfig, protected el: ElementRef) {
//     super(customConfig, el);
//   }
//
//   protected getContainerStyles(totalCount: number): any {
//     return {
//       width: `${ this.itemWidth }px`,
//       height: `${ this.getDisplayedSize(totalCount) }px`
//     };
//   }
//
//   protected getTransformValue(value: number): any {
//     return { transform: `translate3d(0, ${ value }px, 0)` };
//   }
//
//   protected getDisplayedSize(totalCount: number): number {
//     const displayedCount: number = Math.min(this.maxShownItems, totalCount) || totalCount;
//     return Math.min(displayedCount * this.itemHeight, this.el.nativeElement.clientHeight);
//   }
// }
