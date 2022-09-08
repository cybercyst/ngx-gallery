import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { GalleryState } from './gallery.model';

interface CarouselIndex {
  page: number;
  item: number;
}

interface CarouselOptions {
  loop?: boolean;
  perPage?: number;
  playSpeed?: number;
  playReverse?: boolean;
}

/** Initial state */
const defaultState: GalleryState = {
  play: false,
  activeItem: 0,
  activePage: 0,
  hasNextItem: false,
  hasPrevItem: false,
  pages: [],
  total: 0
};

const playChangedPipe = distinctUntilChanged((curr: GalleryState, prev: GalleryState) => curr.play === prev.play);

export class GalleryRef {

  /** Index that stores groups and items keys */
  private readonly _index = new Map<number, CarouselIndex>();

  /** Subscription for carousel player */
  // private readonly _player: SubscriptionLike = Subscription.EMPTY;

  /** Stream that emits carousel state */
  private readonly _state = new BehaviorSubject<GalleryState>(defaultState);
  readonly state$ = this._state.asObservable();

  /** Stream that emits when the player should start or stop */
  get playChanged(): Observable<GalleryState> {
    return this.state$.pipe(playChangedPipe);
  }

  /** Get the current state of the carousel state stream */
  get snapshot(): GalleryState {
    return this._state.value;
  }

  // constructor() {
  //   this._player = this._activatePlayer();
  // }

  /**
   * Configure carousel
   * @param config Carousel config
   */
  configure(config: CarouselOptions) {
    this._patchState({
      loop: config.loop,
      perPage: config.perPage,
      playSpeed: config.playSpeed,
      playReverse: config.playReverse
    });
  }

  /**
   * Set active item
   */
  set(activeItem: number) {
    const { page } = this._index.get(activeItem);
    this._patchState({
      activeItem,
      activePage: page,
      hasNextItem: this.snapshot.loop || activeItem < this.snapshot.total - 1,
      hasPrevItem: this.snapshot.loop || activeItem > 0,
    });
  }

  /**
   * Next item
   */
  next() {
    if (this.snapshot.hasNextItem) {
      this.set(this.snapshot.activeItem + 1);
    } else if (this.snapshot.loop) {
      this.set(0);
    }
  }

  /**
   * Prev item
   */
  prev() {
    if (this.snapshot.hasPrevItem) {
      this.set(this.snapshot.activeItem - 1);
    } else if (this.snapshot.loop) {
      this.set(this.snapshot.total - 1);
    }
  }

  /**
   * Start carousel player
   */
  play(speed = this.snapshot.playSpeed) {
    this._patchState({ play: true, playSpeed: speed });
  }

  /**
   * Stop carousel player
   */
  stop() {
    this._patchState({ play: false });
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
    // this._player.unsubscribe();
    this._state.complete();
  }

  /**
   * Patch state
   */
  private _patchState(state: GalleryState) {
    this._state.next({ ...this.snapshot, ...state });
  }

  /**
   * Activate player actions listener
   */
  // private _activatePlayer(): Subscription {
  //   return this.state$.pipe(
  //     switchMap((state: GalleryState) =>
  //       state.play ? of({}).pipe(
  //         delay(this.snapshot.playSpeed),
  //         tap(() => {
  //           this.snapshot.playReverse
  //             ? this.snapshot.hasPrevItem ? this.prev() : this.set(this.snapshot.pages.length - 1)
  //             : this.snapshot.hasNextItem ? this.next() : this.set(0);
  //         })
  //       ) : EMPTY
  //     )
  //   ).subscribe();
  // }
}
