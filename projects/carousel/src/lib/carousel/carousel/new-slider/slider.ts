import {
  Component,
  Input,
  Output,
  Inject,
  ViewChild,
  ViewChildren,
  EventEmitter,
  NgZone,
  ElementRef,
  SimpleChanges,
  QueryList,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { distinctUntilChanged, fromEvent, mergeMap, Observable, startWith, Subject, Subscriber } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import {
  CAROUSEL_MODE,
  CAROUSEL_ORIENTATION,
  CarouselActionEvent,
  CarouselMode,
  CarouselState
} from '../../carousel.model';
import { HorizontalSliderAdapter, SliderAdapter, VerticalSliderAdapter } from './slider.adapter';
import { CarouselViewport } from './viewport/carousel-viewport';
import { ItemComponent } from './item/item.component';

let sliderId: number = 0;

@Component({
  host: {
    '[attr.orientation]': 'orientation'
  },
  selector: 'new-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSlider implements AfterViewInit, OnInit, OnChanges, OnDestroy {

  sliderId: number = sliderId++;

  /**
   * The adapter used for sliding direction measurements
   */
  adapter: SliderAdapter;

  @Input() perPage: number;

  @Input() mode: CarouselMode;

  @Input() centralized: boolean;
  @Input() itemSize: string | number | 'auto';
  @Input() itemCrossSize: string | number | 'auto';

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
  @ViewChild(CarouselViewport, { static: true }) viewport: CarouselViewport;

  @ViewChildren(ItemComponent) items = new QueryList<ItemComponent>();

  /** HammerJS instance */
  protected _hammer: any;

  private Hammer: any;

  /**
   * Observer carousel pages to track the visible pages
   */
  private intersectionObserver: IntersectionObserver;

  private visibleElements: Map<Element, IntersectionObserverEntry> = new Map<Element, IntersectionObserverEntry>();

  private _isPanning: boolean;

  private readonly destroyed$ = new Subject<void>();

  constructor(protected _el: ElementRef,
              protected _zone: NgZone,
              private _platform: Platform,
              @Inject(DOCUMENT) private doc: Document) {
    this.Hammer = (doc?.defaultView as any)?.Hammer;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Scroll to active page when carousel state changes
    if (this.state && changes.state?.currentValue && changes.state.currentValue !== changes.state.previousValue) {
      requestAnimationFrame(() => {
        this.viewport.scrollToIndex(this.state?.activePage, this.state?.behavior);
      });
    }

    // Set carousel sliding direction when orientation changes
    if (changes.orientation?.currentValue && changes.orientation.currentValue !== changes.orientation.previousValue) {
      this.adapter = this.orientation === 'horizontal'
        ? new HorizontalSliderAdapter(this.viewport.el)
        : new VerticalSliderAdapter(this.viewport.el);
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

    if (typeof this.itemSize !== 'undefined' && changes.itemSize?.currentValue !== changes.itemSize?.previousValue) {
      this.setPageSize(this.itemSize);
    }

    if (typeof this.itemCrossSize !== 'undefined' && changes.itemCrossSize?.currentValue !== changes.itemCrossSize?.previousValue) {
      this.setPageCrossSize(this.itemCrossSize);
    }

    this.viewport.el.style.setProperty('--per-page', this.perPage.toString());
  }

  ngOnInit(): void {
    this.setPageSize(this.itemSize);
    this.setPageCrossSize(this.itemCrossSize);

    this._zone.runOutsideAngular(() => {
      // We need to set the visibleElements in the viewport using intersection observer
      this.createIntersectionObserver(this.viewport.el).pipe(
        tap((entry: IntersectionObserverEntry) => {
          entry.target.classList.toggle('g-item-visible', entry.isIntersecting);
          if (entry.isIntersecting) {
            this.visibleElements.set(entry.target, entry);
          } else {
            this.visibleElements.delete(entry.target);
          }
        }),
        takeUntil(this.destroyed$)
      ).subscribe();

      if (this.mode === CAROUSEL_MODE.Strict) {
        // Subscribe to slider scroll event
        fromEvent(this.viewport.el, 'scroll', { passive: true }).pipe(
          debounceTime(50),
          filter(() => !this._isPanning),
          tap(() => this.onViewportScroll()),
          takeUntil(this.destroyed$)
        ).subscribe();
      }
    });
  }

  ngAfterViewInit(): void {
    /**
     * Observer carousel pages to update visible pages
     */
    this.items.notifyOnChanges();
    this.items.changes.pipe(
      startWith(null),
      tap(() => {
        // Disconnect all and reconnect later
        this.visibleElements.forEach((item: IntersectionObserverEntry) => {
          this.intersectionObserver.unobserve(item.target);
        });

        // Connect with the new items
        this.items.toArray().map((item: ItemComponent) => {
          this.intersectionObserver.observe(item.element);
        });
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onHostResize(entry: any): void {
    const width: number = Math.ceil(entry.contentRect.width);
    const height: number = Math.ceil(entry.contentRect.height);
    this.viewport.el.style.width = `${ width }px`;
    this.viewport.el.style.height = `${ height }px`;
    this.viewport.scrollToIndex(this.state.activeItem, 'auto');
    // Detect changes on gallery-item components to re-calculate item size
    // this._cd.detectChanges();
  }

  /**
   * Pan end handler
   */
  protected onPanEnd(e: any): void {
    const delta: number = this.adapter.getPanDelta(e);
    const velocity: number = this.adapter.getPanVelocity(e);

    this._zone.run(() => {
      // Check if scrolled item is great enough to navigate
      const currElement: Element = this.viewport.items.get(this.state.activePage)?.element;

      // Find the gallery item element in the center elements
      const elementAtCenter: Element = this.getElementFromViewportCenter();

      // Check if center item can be taken from element using
      if (elementAtCenter && elementAtCenter !== currElement) {
        const index: number = +elementAtCenter.getAttribute('sliderIndex');
        this.viewport.scrollToIndex(index, 'smooth');
        return;
      }

      // Check if delta is great enough to navigate
      if (Math.abs(delta) > (currElement.clientWidth || this.adapter.clientSize) / 2) {
        return this.action.emit({ action: delta > 0 ? 'prev' : 'next', behavior: 'smooth' });
      }

      // Check if velocity is great enough to navigate
      if (Math.abs(velocity) > 0.3) {
        return this.action.emit({ action: velocity > 0 ? 'prev' : 'next', behavior: 'smooth' });
      }

      // Reset position to the current index
      this.viewport.scrollToIndex(this.state.activeItem, 'smooth');
    });
  }

  /**
   * Activate gestures
   */
  protected activateGestures(): void {
    this._hammer.get('pan').set({ direction: this.adapter.direction });

    // The offset value on pan start
    let panOffset = 0;

    // Set _panOffset for sliding on pan start event
    this._hammer.on('panstart', () => {
      // Stop any ongoing smooth scroll
      this.viewport.dismissOngoingScroll();
      // panOffset = this.adapter.scrollValue;
      panOffset = this.viewport.measureScrollOffset(this.adapter.offsetKey);

      // Disable scroll-snap-type functionality
      this.viewport.el.style.scrollSnapType = 'unset';
      this.viewport.el.classList.add('g-sliding');
    });

    this._hammer.on('panend', (e: any) => {
      this.viewport.el.classList.remove('g-sliding');
      if (this.mode === CAROUSEL_MODE.Strict) {
        this.onPanEnd(e);
      } else {
        // Enable scroll-snap-type functionality
        this.viewport.el.style.scrollSnapType = this.adapter.scrollSnapType;
      }
    });

    // Activate the slider
    this._hammer.on('panmove', (e: any) => this.viewport.scrollToOffset(panOffset, e, 'auto'));
  }

  protected deactivateGestures() {
    if (this._hammer) {
      this._hammer.off('panstart');
      this._hammer.off('panend');
      this._hammer.off('panmove');
    }
  }

  private tryScrollToElement(elementAtCenter: HTMLElement): void {
    const allowedMargin: number = 10;
    const offsetDiff: number = (this.adapter.clientSize - this.adapter.getClientSize(elementAtCenter)) / 2;
    const rangeStart: number = this.adapter.scrollValue + offsetDiff;
    const rangeEnd: number = this.adapter.scrollValue + this.adapter.clientSize - offsetDiff;
    const elStart: number = this.adapter.getOffsetSize(elementAtCenter);
    const elEnd: number = elStart + this.adapter.getClientSize(elementAtCenter);

    const isStart: boolean = rangeStart + allowedMargin >= elStart && rangeStart - allowedMargin <= elStart;
    const isEnd: boolean = rangeEnd + allowedMargin >= elEnd && rangeEnd - allowedMargin <= elEnd;

    // Reset position
    this.viewport.el.style.scrollSnapType = this.adapter.scrollSnapType;

    // Check if element is within the detection range
    if (isStart && isEnd) {
      // If element is within the range set it as the active gallery item
      const index: number = +elementAtCenter.getAttribute('sliderIndex');
      this._zone.run(() => this.action.emit({ action: index, behavior: 'smooth' }));
    }
  }

  private getElementFromViewportCenter(): Element {
    // Get slider position relative to the document
    const sliderRect = this.viewport.el.getBoundingClientRect();
    // Try look for the center item using `elementsFromPoint` function
    const centerElements = this.doc.elementsFromPoint(sliderRect.x + (sliderRect.width / 2), sliderRect.y + (sliderRect.height / 2));
    // Find the gallery item element in the center elements
    return centerElements.find((element: Element) => element.localName === 'carousel-page' && +element.getAttribute('sliderId') === this.sliderId);
  }

  private onViewportScroll(): void {
    // Check if scrolled item is great enough to navigate
    const currElement: Element = this.viewport.items.get(this.state.activeItem)?.element;
    const elementAtCenter: Element = this.getElementFromViewportCenter();

    if (elementAtCenter) {
      // Check if the gallery-item element is not the active element
      if (elementAtCenter !== currElement) {
        this.tryScrollToElement(elementAtCenter as HTMLElement);
      }
    } else {
      this.visibleElements.forEach((entry: IntersectionObserverEntry) => {
        this.tryScrollToElement(entry.target as HTMLElement);
      });
    }
  }

  private createIntersectionObserver(element: Element): Observable<IntersectionObserverEntry> {
    return new Observable((observer: Subscriber<IntersectionObserverEntry[]>) => {
      this.intersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => observer.next(entries),
        { root: element }
      );
      return () => this.intersectionObserver.disconnect();
    }).pipe(
      mergeMap((entries: IntersectionObserverEntry[]) => entries),
      distinctUntilChanged(),
    );
  }

  private setPageSize(value: number | string | 'auto'): void {
    this.viewport.el.style.setProperty('--page-size', this.adapter.getItemSize(value));
  }

  private setPageCrossSize(value: number | string | 'auto'): void {
    this.viewport.el.style.setProperty('--page-cross-size', this.adapter.getItemSize(value, true));
  }
}
