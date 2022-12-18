import { Component, Input, Output, EventEmitter, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { CAROUSEL_ORIENTATION, CarouselBehavior, CarouselOrientation } from '../carousel.model';
import { ThumbnailsPosition } from '../../gallery.model';
import { CarouselLayer } from '../carousel-layer/carousel-layer';

@Component({
  host: {
    '[class.carousel-dots]': 'true'
  },
  selector: 'carousel-dots',
  templateUrl: './carousel-dots.html',
  styleUrls: ['./carousel-dots.scss'],
  providers: [{ provide: CarouselLayer, useExisting: CarouselDots }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselDots extends CarouselLayer {

  get thumbOrientation(): CarouselOrientation {
    return this.position === ThumbnailsPosition.Top || this.position === ThumbnailsPosition.Bottom
      ? CAROUSEL_ORIENTATION.Horizontal : CAROUSEL_ORIENTATION.Vertical;
  }

  /**
   * Whether to show the number on the items
   */
  @Input() showNumber: boolean = true;

  /**
   * Whether or not the active item is always positioned the center of the carousel
   */
  @Input() centralised: boolean = false;

  /**
   * The maximum number of items to be shown in the slider
   */
  @Input() maxShownItems: number = 9;

  /**
   * Sets the width of the item
   */
  @Input() itemSize: number = 30;

  /**
   * Sets the height of the item
   */
  @Input() itemCrossSize: number = 30;

  /**
   * The navigation behavior between items by item click
   */
  @Input() clickBehavior: CarouselBehavior = 'smooth';

  /**
   * The position of the dots in the carousel
   */
  @Input() position: 'top' | 'bottom' = 'top';

  /**
   * A stream that emits when an item is clicked
   */
  @Output() itemClick = new EventEmitter();

  constructor(@Optional() public host: Carousel) {
    super(host);
  }

  onItemClick(index: number) {
    this.host.carouselRef.setItem({
      index,
      behavior: this.clickBehavior
    });
    this.itemClick.emit(index);
  }
}
