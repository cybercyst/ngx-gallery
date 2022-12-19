import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';
import { CarouselCore } from '../carousel/carousel-core';

@Directive({
  standalone: true,
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

  constructor(@Optional() private carousel: CarouselCore) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.position && !changes.position.firstChange && changes.position.currentValue !== changes.position.previousValue) {
      this.carousel.updateLayout();
    }
  }
}
