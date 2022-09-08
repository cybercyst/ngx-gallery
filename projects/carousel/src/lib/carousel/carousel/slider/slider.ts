import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectionStrategy, Inject
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  CAROUSEL_BEHAVIOR,
  CAROUSEL_ORIENTATION,
  CarouselActionEvent,
  CarouselBehavior,
  CarouselState
} from '../../carousel.model';
import { HorizontalSliderAdapter, SliderAdapter, VerticalSliderAdapter } from './slider.adapter';

@Component({
  selector: 'slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slider implements OnChanges {

  /**
   * The adapter used for sliding direction measurements
   */
  adapter: SliderAdapter = new HorizontalSliderAdapter(this._el.nativeElement);

  @Input() gestures: boolean;
  // TODO: pan sensitivity does not do anything!
  @Input() panSensitivity: number;
  @Input() state: CarouselState;
  @Input() sensorDisabled: boolean;
  @Input() sensorThrottleTime: number;
  @Input() orientation: CAROUSEL_ORIENTATION = CAROUSEL_ORIENTATION.Horizontal;

  @Output() itemClick = new EventEmitter<number>();
  @Output() action = new EventEmitter<CarouselActionEvent>();
  @Output() scrollIndexChange = new EventEmitter<CarouselState>();

  /**
   * Virtual scroll viewport reference
   */
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport;

  get itemWidth(): number {
    return this._el.nativeElement.clientWidth;
  }

  get itemHeight(): number {
    return this._el.nativeElement.clientHeight;
  }

  get itemSize(): number {
    return this.adapter.itemSize;
  }

  /** HammerJS instance */
  protected _hammer: any;

  /** The offset value on pan start */
  protected _panOffset = 0;

  private Hammer: any;

  constructor(protected _el: ElementRef,
              protected _zone: NgZone,
              private _platform: Platform,
              @Inject(DOCUMENT) doc: Document) {
    this.Hammer = (doc?.defaultView as any)?.Hammer;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Scroll to active page when carousel state changes
    if (!changes.state?.firstChange && changes.state?.currentValue && changes.state.currentValue !== changes.state.previousValue) {
      this.viewPort.scrollToIndex(this.state?.activePage, this.state?.behavior);
    }

    // Set carousel sliding direction when orientation changes
    if (changes.orientation?.currentValue && changes.orientation.currentValue !== changes.orientation.previousValue) {
      this.adapter = this.orientation === 'horizontal'
        ? new HorizontalSliderAdapter(this._el.nativeElement)
        : new VerticalSliderAdapter(this._el.nativeElement);
    }

    // Activate/Deactivate gestures when gestures changes
    if (typeof changes.gestures?.currentValue === 'boolean' && changes.gestures.currentValue !== changes.gestures.previousValue) {
      if (this.gestures && this._platform.isBrowser) {
        this._zone.runOutsideAngular(() => {
          if (this.Hammer) {
            this._hammer = new this.Hammer(this._el.nativeElement);
            this.activateGestures();
          }
        });
      } else {
        this.deactivateGestures();
      }
    }
  }

  /**
   * Pan end handler
   */
  protected _panEnd(velocity: number, delta: number) {
    this._zone.run(() => {
      const behavior: CarouselBehavior = CAROUSEL_BEHAVIOR.Smooth;
      // Check if scrolled item is great enough to navigate
      if (Math.abs(delta) > (this.itemSize / 2)) {
        this.action.next({ action: delta > 0 ? 'prev' : 'next', behavior });
        return;
      }
      // Check if velocity is great enough to navigate
      if (Math.abs(velocity) > 0.3) {
        this.action.next({ action: velocity > 0 ? 'prev' : 'next', behavior });
        return;
      }
      this.action.next({ action: this.state.activePage, behavior });
    });
  }

  /**
   * Activate gestures
   */
  protected activateGestures(): void {
    this._hammer.get('pan').set({ direction: this.adapter.direction });

    // Set _panOffset for sliding on pan start event
    this._hammer.on('panstart', () => {
      this._panOffset = this.viewPort.measureScrollOffset(this.adapter.offsetKey);
    });

    this._hammer.on('panend', (e: any) => {
      // if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) return;
      this._panEnd(this.adapter.getVelocity(e), this.adapter.getDelta(e));
    });

    // Activate the slider
    this._hammer.on('panmove', (e: any) => {
      // Show effect that it cannot be scrolled
      const position: number = -(this.adapter.getDelta(e) - this._panOffset);
      this.viewPort.scrollToOffset(position, 'auto');

      // TODO: Display limit exceeded effect
      // if (position < 0) {
      //   console.log('LESS');
      // } else if (position + this.viewPort.getViewportSize() > this.viewPort['_totalContentSize']) {
      //   console.log('MORE');
      // }
    });
  }

  protected deactivateGestures() {
    if (this._hammer) {
      this._hammer.off('panstart');
      this._hammer.off('panend');
      this._hammer.off('panmove');
    }
  }
}


// Code for enable normal scroll

// this.viewPort.scrolledIndexChange.pipe(
//   tap((index: number) => {
//     currentIndex = index;
//     currentIndexOffset = this.viewPort.measureScrollOffset('start');
//     console.log('current index', index);
//   })
// ).subscribe();


// this.viewPort.elementScrolled().pipe(
//   debounceTime(400),
//   // filter(() => !scrolling),
//   switchMap((x) => {
//     return of({}).pipe(
//       tap(() => {
//         console.log('x', x);
//         const viewportOffset: number = this.viewPort.measureScrollOffset('start');
//         const viewportSize = this.viewPort.getViewportSize();
//         // Check if scrolling forward or backward
//         if (viewportOffset > currentIndexOffset) {
//           // Scrolling forward
//           if (viewportOffset + (viewportSize / 2) > currentIndexOffset) {
//             console.log('Scrolling forward: go prev');
//             this.viewPort.scrollToIndex(currentIndex + 1, 'smooth');
//           } else {
//             console.log('Scrolling forward stay');
//             this.viewPort.scrollToIndex(currentIndex, 'smooth');
//           }
//         } else {
//           // Scrolling backward
//           if (viewportOffset + (viewportSize / 2) < currentIndexOffset) {
//             console.log('Scrolling backward: go prev');
//             this.viewPort.scrollToIndex(currentIndex - 1, 'smooth');
//           } else {
//             console.log('Scrolling backward: stay');
//             this.viewPort.scrollToIndex(currentIndex, 'smooth');
//           }
//         }
//
//         // if (viewportOffset > (currentIndex * viewportSize) + (viewportSize / 2)) {
//         // }
//       })
//     );
//   })
// ).subscribe();
