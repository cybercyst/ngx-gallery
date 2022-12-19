// import {
//   Directive,
//   Input,
//   AfterViewInit,
//   OnChanges,
//   ElementRef,
//   SimpleChanges,
//   Optional,
//   Inject
// } from '@angular/core';
// import { takeUntil, tap } from 'rxjs/operators';
// import {
//   CAROUSEL_BEHAVIOR,
//   CarouselBehavior,
//   CarouselState,
//   CarouselConfig,
//   CAROUSEL_CONFIG
// } from '../carousel.model';
// import { CarouselCore } from '../core/carousel-core';
//
// @Directive({
//   selector: '[centralised-carousel]',
//   providers: [{ provide: CarouselCore, useExisting: CentralisedCarousel }]
// })
// export class CentralisedCarousel extends CarouselCore implements AfterViewInit, OnChanges {
//
//   scrollOffset: number;
//   containerStyles: any;
//   centralizeStyles: any;
//
//   @Input() selectedBehavior: CarouselBehavior = CAROUSEL_BEHAVIOR.Smooth;
//   @Input() clickBehavior: CarouselBehavior = CAROUSEL_BEHAVIOR.Smooth;
//
//   @Input() centralised: boolean;
//   @Input() maxShownItems: number;
//   @Input() itemWidth: number;
//   @Input() itemHeight: number;
//
//   constructor(@Optional() @Inject(CAROUSEL_CONFIG) customConfig: CarouselConfig, protected el: ElementRef) {
//     super(customConfig, el);
//   }
//
//   ngAfterViewInit() {
//     this.carouselRef.state$.pipe(
//       tap((state: CarouselState) => {
//         this.containerStyles = this.getContainerStyles(state.pages.length);
//         this.centralizeStyles = this.getCentralizeStyles(state);
//       }),
//       takeUntil(this.destroyed$)
//     ).subscribe();
//   }
//
//   ngOnChanges(changes: SimpleChanges) {
//     super.ngOnChanges(changes);
//     if ((changes.selected?.currentValue !== undefined)
//       && changes.selected.currentValue !== changes.selected.previousValue) {
//       this.carouselRef.setPage({
//         index: this.selectedItem,
//         behavior: changes.selected.isFirstChange() ? CAROUSEL_BEHAVIOR.Auto : this.selectedBehavior
//       });
//     }
//   }
//
//   onItemClick(index: number) {
//     this.carouselRef.setPage({ index, behavior: this.clickBehavior });
//     this.itemClick.emit(index);
//   }
//
//   private getCentralizeStyles(state: CarouselState): any {
//     // const itemSize: number = this.itemSize;
//     // const viewportSize: number = this.getDisplayedSize(state.pages.length);
//     // const hiddenSize: number = (itemSize * state.pages.length) - viewportSize;
//     // const activePagePosition: number = itemSize * state.activePage;
//     // const centerOffset: number = viewportSize / 2;
//     // const position: number = activePagePosition - centerOffset;
//     // const centeredPosition: number = position + (itemSize / 2);
//     //
//     // if (!this.centralised) {
//     //   // Scroll viewport to the center position
//     //   this.scrollOffset = centeredPosition;
//     //   return;
//     // }
//     // // Scroll viewport to the center position
//     // this.scrollOffset = centeredPosition;
//     //
//     // if (centeredPosition < 0) {
//     //   return this.getTransformValue(-centeredPosition);
//     // }
//
//     // if (centeredPosition >= hiddenSize) {
//     //   const displayedCount: number = Math.floor(viewportSize / this.itemSize);
//     //   const centerDeltaSize: number = displayedCount % 2 ? 1 : 0.5;
//     //   const endDisplayedCount = displayedCount / 2;
//     //   const delta = centerOffset - (endDisplayedCount * itemSize);
//     //   const endIndex = Math.floor(endDisplayedCount) - (state.pages.length - state.activePage);
//     //   return this.getTransformValue(-((centerDeltaSize + endIndex) * itemSize) - delta);
//     // }
//
//     return this.getTransformValue(0);
//   }
//
//   /**
//    * Load the content items into the carouselRef and set the selected page
//    */
//   protected checkCarouselItems() {
//     // Make sure perPage is always 1
//     this.carouselRef.configure({
//       perPage: 1
//     });
//     super.checkCarouselItems();
//   }
//
//   protected getContainerStyles(totalCount: number): any {
//     return undefined;
//   }
//
//   protected getTransformValue(value: number): any {
//     return undefined;
//   }
//
//   protected getDisplayedSize(totalCount: number): number {
//     return undefined;
//   }
// }
