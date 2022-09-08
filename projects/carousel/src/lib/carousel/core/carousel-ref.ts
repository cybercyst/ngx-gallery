import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  CAROUSEL_BEHAVIOR,
  CarouselBehavior,
  CarouselItem,
  CarouselScrollEvent,
  CarouselState,
  CarousePage
} from '../carousel.model';

interface CarouselIndex {
  page: number;
  item: number;
}

interface CarouselOptions {
  loop?: boolean;
  perPage?: number;
}

/** Initial state */
const defaultState: CarouselState = {
  activeItem: 0,
  activePage: 0,
  behavior: CAROUSEL_BEHAVIOR.Auto,
  hasNextItem: false,
  hasPrevItem: false,
  hasNextPage: false,
  hasPrevPage: false,
  loop: false,
  perPage: 1,
  pages: [],
  total: 0
};

const itemChangedPipe = distinctUntilChanged((curr: CarouselState, prev: CarouselState) => curr.activeItem === prev.activeItem);
const pageChangedPipe = distinctUntilChanged((curr: CarouselState, prev: CarouselState) => curr.activePage === prev.activePage);
const loadChangedPipe = distinctUntilChanged((curr: CarouselState, prev: CarouselState) => curr.pages === prev.pages);

export class CarouselRef {

  /** Index that stores groups and items keys */
  private readonly _index = new Map<number, CarouselIndex>();

  /** Stream that emits carousel state */
  private readonly _state = new BehaviorSubject<CarouselState>(defaultState);
  readonly state$ = this._state.asObservable();

  private items: CarouselItem[];

  /** Stream that emits when items is loaded */
  get loadChanged(): Observable<CarouselState> {
    return this.state$.pipe(loadChangedPipe);
  }

  /** Stream that emits when active changed */
  get activePageChanged(): Observable<CarouselState> {
    return this.state$.pipe(pageChangedPipe);
  }

  /** Stream that emits when active changed */
  get activeItemChanged(): Observable<CarouselState> {
    return this.state$.pipe(itemChangedPipe);
  }

  /** Get the current state of the carousel state stream */
  get snapshot(): CarouselState {
    return this._state.value;
  }

  /**
   * Configure carousel
   * @param config Carousel config
   */
  configure(config: CarouselOptions) {
    // If perPage is changed, reload the items
    if (this.snapshot.perPage !== config.perPage) {
      this._patchState({
        loop: config.loop,
        perPage: config.perPage
      });
      if (this.items) {
        this.load(this.items, this.snapshot.activeItem);
      }
    } else {
      this._patchState({
        loop: config.loop,
        perPage: config.perPage
      });
    }
  }

  /**
   * Load carousel items
   */
  load(items: CarouselItem[], selectedItem: number = 0) {
    this.items = items;
    const pages: CarousePage[] = [];
    const perPage: number = this.snapshot.perPage;
    const extra: number = items.length % perPage;
    const pagesCount = Math.floor(extra ? (items.length / perPage) + extra : items.length / perPage);

    Array.from(Array(pagesCount).keys()).map((i: number) => {
      const newItems: CarouselItem[] = [];
      const itemsPart = items.slice(i * perPage, (i * perPage) + perPage);

      // Check if there is items to pushed in new page
      if (itemsPart.length) {
        itemsPart.forEach((item: CarouselItem, j: number) => {
          const page = (i * perPage) + j;
          newItems.push({ index: page, template: item.template });
          this._index.set(page, { page: i, item: j });
        });
        pages.push({ index: i, items: newItems });
      }
    });

    // Get the page that contains the selected item
    const { page: selectedPage } = this._index.get(selectedItem) || { page: 0 };

    // Initialize carousel items
    this._patchState({
      pages,
      total: items.length,
      activeItem: selectedItem,
      activePage: selectedPage,
      hasNextItem: selectedItem < items.length - 1,
      hasNextPage: selectedPage < pages.length - 1,
      hasPrevItem: selectedItem > 0,
      hasPrevPage: selectedPage > 0,
    });
  }

  /**
   * Set active item
   */
  setItem({ index, behavior }: CarouselScrollEvent) {
    const { page: pageIndex } = this._index.get(index) || { page: 0 };
    this._patchState({
      behavior,
      activeItem: index,
      activePage: pageIndex,
      hasNextItem: index < this.snapshot.total - 1,
      hasNextPage: pageIndex < this.snapshot.pages.length - 1,
      hasPrevItem: index > 0,
      hasPrevPage: pageIndex > 0,
    });
  }

  /**
   * Set active page
   */
  setPage({ index, behavior }: CarouselScrollEvent, setActiveItem: boolean = true) {
    const itemIndex = this.snapshot.pages[index]?.items[0]?.index;
    this._patchState({
      behavior,
      activePage: index,
      activeItem: setActiveItem ? itemIndex : this._state.value.activeItem,
      hasNextItem: itemIndex < this.snapshot.total - 1,
      hasNextPage: index < this.snapshot.pages.length - 1,
      hasPrevItem: itemIndex > 0,
      hasPrevPage: index > 0,
    });
  }

  /**
   * Next item
   */
  nextItem(behavior: CarouselBehavior) {
    if (this.snapshot.hasNextItem) {
      this.setItem({ index: this.snapshot.activeItem + 1, behavior });
    } else if (this.snapshot.loop) {
      this.setItem({ index: 0, behavior });
    }
  }

  /**
   * Prev item
   */
  prevItem(behavior: CarouselBehavior) {
    if (this.snapshot.hasPrevItem) {
      this.setItem({ index: this.snapshot.activeItem - 1, behavior });
    } else if (this.snapshot.loop) {
      this.setItem({ index: this.snapshot.total - 1, behavior });
    }
  }

  /**
   * Prev page
   */
  nextPage(behavior: CarouselBehavior, setActiveItem?: boolean) {
    if (this.snapshot.hasNextPage) {
      this.setPage({ index: this.snapshot.activePage + 1, behavior }, setActiveItem);
    } else if (this.snapshot.loop) {
      this.setPage({ index: 0, behavior }, setActiveItem);
    }
  }

  /**
   * Prev page
   */
  prevPage(behavior: CarouselBehavior, setActiveItem?: boolean) {
    if (this.snapshot.hasPrevPage) {
      this.setPage({ index: this.snapshot.activePage - 1, behavior }, setActiveItem);
    } else if (this.snapshot.loop) {
      this.setPage({ index: this.snapshot.pages.length - 1, behavior }, setActiveItem);
    }
  }

  /**
   * Reset carousel state
   */
  reset() {
    this._patchState(defaultState);
  }

  /**
   * Destroy carousel
   */
  destroy() {
    this._state.complete();
  }

  /**
   * Patch state
   * @param state Carousel state
   */
  private _patchState(state: CarouselState) {
    this._state.next({ ...this.snapshot, ...state });
  }

  /**
   * Activate player actions listener
   */
  // private _activatePlayer(): Subscription {
  // return this.state$.pipe(
  // switchMap((state: CarouselState) =>
  //   state.play ? of({}).pipe(
  //     delay(this.snapshot.playSpeed),
  //     tap(() => {
  //       this.snapshot.playReverse
  //         ? this.snapshot.hasPrevPage ? this.prevPage() : this.setPage(this.snapshot.pages.length - 1)
  //         : this.snapshot.hasNextPage ? this.nextPage() : this.setPage(0);
  //     })
  //   ) : EMPTY
  // )
  // ).subscribe();
  // }
}
