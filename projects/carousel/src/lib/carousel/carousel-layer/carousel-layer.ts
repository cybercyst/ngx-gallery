import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { Carousel } from '../carousel/carousel';

@Directive({
  host: {
    '[class.carousel-layer]': 'true',
    '[attr.compact]': 'compact',
    '[attr.position]': 'position',
    '[style.gridArea]': 'position'
  },
  selector: 'carousel-layer, [carouselLayer]'
})
export class CarouselLayer implements OnChanges {

  /**
   * The position of the dots in the carousel
   */
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'top';


  /**
   * Should overlay the carousel
   */
  @Input() compact: boolean = false;

  constructor(@Optional() public host: Carousel) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position && !changes.position.firstChange && changes.position.currentValue !== changes.position.previousValue) {
      this.host?.updateLayout();
    }
  }
}
