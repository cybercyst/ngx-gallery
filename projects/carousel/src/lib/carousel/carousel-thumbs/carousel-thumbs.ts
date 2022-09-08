import { Component, Input, Output, EventEmitter, Optional, ChangeDetectionStrategy } from '@angular/core';
import { Carousel } from '../carousel/carousel';
import { CAROUSEL_ORIENTATION, CarouselBehavior } from '../carousel.model';
import { ThumbnailsPosition } from '../../gallery.model';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  host: {
    '[attr.compact]': 'compact',
    '[attr.position]': 'position',
    '[style.gridArea]': 'position'
  },
  selector: 'carousel-thumbs',
  templateUrl: './carousel-thumb.html',
  styleUrls: ['./carousel-thumb.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselThumbs {

  get thumbOrientation() {
    return this.position === ThumbnailsPosition.Top || this.position === ThumbnailsPosition.Bottom
      ? CAROUSEL_ORIENTATION.Horizontal : CAROUSEL_ORIENTATION.Vertical;
  }

  /**
   * Whether or not the active item is always positioned the center of the carousel
   */
  @Input() centralised: boolean = true;


  @Input() mode: 'default' | 'center-method' = 'default';


  @Input() perPage: number = 3;

  /**
   * Whether or not it overlays the carousel
   */
  @Input() compact: boolean = false;

  /**
   * The maximum number of items to be shown in the slider
   */
  @Input() maxShownItems: number = 9;

  /**
   * Sets the width of the item
   */
  @Input() itemWidth: number = 100;

  /**
   * Sets the height of the item
   */
  @Input() itemHeight: number = 60;

  /**
   * The navigation behavior between items by item click
   */
  @Input() clickBehavior: CarouselBehavior = 'smooth';

  /**
   * The position of the dots in the carousel
   */
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'top';

  /**
   * A stream that emits when an item is clicked
   */
  @Output() itemClick = new EventEmitter();

  constructor(@Optional() public host: Carousel, breakpointObserver: BreakpointObserver) {
    // const layoutChanges = breakpointObserver.observe([]);

    // layoutChanges.subscribe(result => {
    // });
  }

  onItemClick(index: number) {
    this.host.carouselRef.setItem({
      index,
      behavior: this.clickBehavior
    });
    this.itemClick.emit(index);
  }
}
