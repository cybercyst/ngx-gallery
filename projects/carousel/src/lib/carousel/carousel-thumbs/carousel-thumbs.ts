import {
  Component,
  Inject,
  Input,
  Optional,
  Output,
  SkipSelf,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Carousel } from '../carousel/carousel';
import {
  CAROUSEL_CONFIG,
  CAROUSEL_ORIENTATION,
  CarouselBehavior,
  CarouselConfig,
  CarouselItem,
  CarouselOrientation, CarouselState
} from '../carousel.model';
import { ThumbnailsPosition } from '../../gallery.model';
import { CarouselLayer } from '../carousel-layer/carousel-layer';
import { CarouselCore } from '../carousel/carousel-core';

@Component({
  host: {
    '[class.carousel-thumbs]': 'true',
    '[style.width]': 'orientation === CarouselOrientation.Horizontal ? "100%" : itemBlockSize + "px"',
    '[style.height]': 'orientation === CarouselOrientation.Horizontal ? itemBlockSize + "px" : "100%"',
  },
  selector: 'carousel-thumbs',
  templateUrl: './carousel-thumbs.html',
  styleUrls: ['../carousel/carousel.scss', './carousel-thumb.scss'],
  hostDirectives: [
    {
      directive: CarouselLayer,
      inputs: ['position', 'compact'],
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselThumbs extends CarouselCore {

  get thumbOrientation(): CarouselOrientation {
    return this.position === ThumbnailsPosition.Top || this.position === ThumbnailsPosition.Bottom
      ? CAROUSEL_ORIENTATION.Horizontal : CAROUSEL_ORIENTATION.Vertical;
  }

  get orientation(): CarouselOrientation {
    return this.thumbOrientation;
  }


  get items(): CarouselItem[] | undefined {
    return this.parent.contentThumbItems?.toArray();
  }

  /**
   * The position of the dots in the carousel
   */
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'top';

  /**
   * Should overlay the carousel
   */
  @Input() compact: boolean = false;

  /**
   * The maximum number of items to be shown in the slider
   */
  @Input() maxShownItems: number = 9;

  /**
   * The navigation behavior between items by item click
   */
  @Input() clickBehavior: CarouselBehavior = 'auto';

  @Input() clickDisabled: boolean;

  /**
   * A stream that emits when an item is clicked
   */
  @Output() itemClick = new EventEmitter();

  constructor(@SkipSelf() public parent: Carousel,
              @Optional() @Inject(CAROUSEL_CONFIG) protected customConfig: CarouselConfig,
              public elementRef: ElementRef<HTMLElement>) {
    super(customConfig, elementRef);
    this.parent.state.pipe(takeUntil(this.destroyed$)).subscribe((state: CarouselState) => {
      this.carouselRef.setItem({
        index: state.activeItem,
        behavior: state.behavior
      });
    });
  }

  onItemClick(index: number): void {
    if (!this.clickDisabled) {
      super.onItemClick(index);
      this.parent.carouselRef.setItem({
        index,
        behavior: this.clickBehavior
      });
    }
  }

  updateLayout(): void {
  }
}
