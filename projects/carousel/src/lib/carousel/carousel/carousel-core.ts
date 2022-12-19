import {
  Directive,
  EventEmitter,
  Input,
  Output,
  Inject,
  Optional,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ContentChildren,
  ElementRef, AfterContentInit
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CarouselRef } from '../carousel-ref/carousel-ref';
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
export abstract class CarouselCore implements AfterContentInit, OnChanges, OnDestroy {
  /** Carousel ref */
  carouselRef = new CarouselRef();

  /** Carousel orientation options */
  CarouselOrientation = CAROUSEL_ORIENTATION;

  /** Carousel config */
  protected config: CarouselConfig = { ...config, ...this.customConfig };

  protected readonly destroyed$ = new Subject<void>();

  get state(): Observable<CarouselState> {
    return this.carouselRef.state$;
  }

  get snapshot(): CarouselState {
    return this.carouselRef.snapshot;
  }

  get items(): CarouselItem[] | undefined {
    return this.contentItems?.toArray();
  }

  abstract get orientation(): CarouselOrientation;

  @Input() selectedPage: number;
  @Input() selectedItem: number;
  @Input() selectedBehaviour: 'smooth' | 'auto' = 'smooth';
  @Input() perPage: number = this.config.perPage;
  @Input() mode: CarouselMode = this.config.mode;
  @Input() gestures: boolean = this.config.gestures;
  @Input() panSensitivity: number = this.config.panSensitivity;
  @Input() sensorDisabled: boolean = this.config.sensorDisabled;
  @Input() sensorThrottleTime: number = this.config.sensorThrottleTime;
  @Input() itemInlineSize: number | string | 'auto';
  @Input() itemBlockSize: string | number | 'auto';
  @Input() centralized: boolean;

  @Output() itemClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemChanged: Observable<CarouselState> = this.carouselRef.activeItemChanged;
  @Output() pageChanged: Observable<CarouselState> = this.carouselRef.activePageChanged;
  @Output() afterPageChanged: EventEmitter<CarouselState> = new EventEmitter<CarouselState>();

  /** Carousel items reference */
  @ContentChildren(CarouselItemDirective, { emitDistinctChangesOnly: true }) contentItems: QueryList<CarouselItem>;
  @ContentChildren(CarouselItemThumbDirective, { emitDistinctChangesOnly: true }) contentThumbItems: QueryList<CarouselItem>;

  constructor(@Optional() @Inject(CAROUSEL_CONFIG) protected customConfig: CarouselConfig, public elementRef: ElementRef<HTMLElement>) {
  }

  ngAfterContentInit(): void {
    this.loadItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  ngOnDestroy(): void {
    this.carouselRef.destroy();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSliderAction(page: 'prev' | 'next' | number, behavior: CarouselBehavior): void {
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

  onItemClick(index: number): void {
    this.itemClick.emit(index);
  }

  /**
   * Go to page by index
   */
  setPage(index: number, behavior?: CarouselBehavior): void {
    this.carouselRef.setPage({ index, behavior });
  }

  /**
   * Go to item by index
   */
  setItem(index: number, behavior?: CarouselBehavior): void {
    this.carouselRef.setItem({ index, behavior });
  }

  /**
   * Go to next page
   */
  nextPage(behavior?: CarouselBehavior): void {
    this.carouselRef.nextPage(behavior);
  }

  /**
   * Go to prev page
   */
  prevPage(behavior?: CarouselBehavior): void {
    this.carouselRef.prevPage(behavior);
  }

  /**
   * Go to next item
   */
  nextItem(behavior?: CarouselBehavior): void {
    this.carouselRef.nextItem(behavior);
  }

  /**
   * Go to prev item
   */
  prevItem(behavior?: CarouselBehavior): void {
    this.carouselRef.prevItem(behavior);
  }

  /**
   * Load the content items into the carouselRef and set the selected page
   */
  protected loadItems(): void {
    this.carouselRef.load(this.items, this.selectedItem);
  }

  abstract updateLayout(): void;
}
