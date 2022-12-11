import {
  Directive,
  EventEmitter,
  Input,
  Output,
  Inject,
  Optional,
  AfterContentInit,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ContentChildren,
  ElementRef
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { CarouselRef } from './carousel-ref';
import { CarouselItemDirective, CarouselItemThumbDirective } from '../../directives/carousel-item';
import {
  CAROUSEL_CONFIG,
  CAROUSEL_MODE,
  CAROUSEL_ORIENTATION,
  CarouselBehavior,
  CarouselConfig,
  CarouselItem,
  CarouselMode,
  CarouselOrientation,
  CarouselState
} from '../carousel.model';

/**
 * Default config
 */
const config: CarouselConfig = {
  loop: false,
  perPage: 1,
  sensorDisabled: false,
  cacheSize: 20,
  animated: false,
  gestures: true,
  panSensitivity: 25,
  mode: CAROUSEL_MODE.Strict,
  orientation: CAROUSEL_ORIENTATION.Horizontal
};

@Directive({
  selector: '[carousel-core]'
})
export class CarouselCore implements AfterContentInit, OnChanges, OnDestroy {
  /** Carousel ref */
  carouselRef = new CarouselRef();

  /** Carousel orientation options */
  CarouselOrientation = CAROUSEL_ORIENTATION;

  /** Carousel config */
  protected config: CarouselConfig = { ...config, ...this.customConfig };

  protected readonly destroyed$ = new Subject<void>();

  // itemSize: number;

  get state(): Observable<CarouselState> {
    return this.carouselRef.state$;
  }

  get snapshot(): CarouselState {
    return this.carouselRef.snapshot;
  }

  @Input() selectedPage: number;
  @Input() selectedItem: number;
  @Input() selectedBehaviour: 'smooth' | 'auto' = 'smooth';
  @Input() perPage: number = this.config.perPage;
  @Input() mode: CarouselMode = this.config.mode;
  @Input() gestures: boolean = this.config.gestures;
  @Input() cacheSize: number = this.config.cacheSize;
  @Input() panSensitivity: number = this.config.panSensitivity;
  @Input() sensorDisabled: boolean = this.config.sensorDisabled;
  @Input() sensorThrottleTime: number = this.config.sensorThrottleTime;
  @Input() orientation: CarouselOrientation = this.config.orientation;

  @Output() itemClick = new EventEmitter<number>();
  @Output() itemChanged = this.carouselRef.activeItemChanged;
  @Output() pageChanged = this.carouselRef.activePageChanged;
  @Output() afterPageChanged = new EventEmitter<CarouselState>();

  /** Carousel items reference */
  @ContentChildren(CarouselItemDirective, { emitDistinctChangesOnly: true }) contentItems: QueryList<CarouselItem>;
  @ContentChildren(CarouselItemThumbDirective, { emitDistinctChangesOnly: true }) contentThumbItems: QueryList<CarouselItem>;

  readonly thumbs$ = new Subject();

  constructor(@Optional() @Inject(CAROUSEL_CONFIG) protected customConfig: CarouselConfig, public elementRef: ElementRef) {
  }

  ngAfterContentInit() {
    // Query carousel items in content to attach them in the slider
    this.contentItems.notifyOnChanges();
    this.contentItems.changes.pipe(
      startWith({}),
      tap(() => this.checkCarouselItems()),
      takeUntil(this.destroyed$)
    ).subscribe();

    this.contentThumbItems.notifyOnChanges();
    this.contentThumbItems.changes.pipe(
      startWith({}),
      tap(() => this.thumbs$.next(this.contentThumbItems.toArray())),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.carouselRef.configure({
      perPage: this.perPage
    });

    // Set the selected page if changed, use 'auto' for behaviour in the first time active item/page is changed
    if (changes.selectedPage?.currentValue !== undefined
      && changes.selectedPage.currentValue !== changes.selectedPage.previousValue) {
      this.setPage(this.selectedPage, changes.selectedItem?.firstChange ? 'auto' : this.selectedBehaviour);
    }

    // Set the selected item if changed, use 'auto' for behaviour in the first time active item/page is changed
    if (changes.selectedItem?.currentValue !== undefined
      && changes.selectedItem.currentValue !== changes.selectedItem.previousValue) {
      this.setItem(this.selectedItem, changes.selectedItem?.firstChange ? 'auto' : this.selectedBehaviour);
    }
  }

  ngOnDestroy() {
    this.carouselRef.destroy();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSliderAction(page: 'prev' | 'next' | number, behavior: CarouselBehavior) {
    switch (page) {
      case 'next':
        this.carouselRef.nextPage(behavior, this.perPage === 1);
        break;
      case 'prev':
        this.carouselRef.prevPage(behavior, this.perPage === 1);
        break;
      default:
        this.carouselRef.setPage({ index: page, behavior }, true);
    }
  }

  /**
   * Go to page by index
   */
  setPage(index: number, behavior?: CarouselBehavior) {
    this.carouselRef.setPage({ index, behavior });
  }

  /**
   * Go to item by index
   */
  setItem(index: number, behavior?: CarouselBehavior) {
    this.carouselRef.setItem({ index, behavior });
  }

  /**
   * Go to next page
   */
  nextPage(behavior?: CarouselBehavior) {
    this.carouselRef.nextPage(behavior);
  }

  /**
   * Go to prev page
   */
  prevPage(behavior?: CarouselBehavior) {
    this.carouselRef.prevPage(behavior);
  }

  /**
   * Go to next item
   */
  nextItem(behavior?: CarouselBehavior) {
    this.carouselRef.nextItem(behavior);
  }

  /**
   * Go to prev item
   */
  prevItem(behavior?: CarouselBehavior) {
    this.carouselRef.prevItem(behavior);
  }

  /**
   * Load the content items into the carouselRef and set the selected page
   */
  protected checkCarouselItems() {
    this.carouselRef.load(this.contentItems.toArray(), this.selectedItem);
  }

}
