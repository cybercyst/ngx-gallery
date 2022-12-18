import {
  Component,
  Optional,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { NumberInput, BooleanInput, coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';
import { Subject, Observable, merge, fromEvent, tap, filter, map, takeUntil, switchMap, startWith, EMPTY } from 'rxjs';
import { Carousel } from '../carousel/carousel';
import { CarouselLayer } from '../carousel-layer/carousel-layer';

@Component({
  selector: 'carousel-player',
  templateUrl: './carousel-player.html',
  styleUrls: ['./carousel-player.scss'],
  providers: [{ provide: CarouselLayer, useExisting: CarouselPlayer }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselPlayer implements AfterViewInit, OnChanges, OnDestroy {

  player: AnimationPlayer;

  readonly isPlaying$ = new Subject<boolean>();
  private readonly player$ = new Subject<void>();
  private readonly destroyed$ = new Subject<void>();

  private _isStopped: boolean = false;
  private _reversed: boolean = false;
  private _progress: boolean = true;
  private _autoplay: boolean = true;
  private _speed: number = 3000;

  /** Whether player should start on init. */
  @Input()
  get isStopped(): boolean {
    return this._isStopped;
  }

  private set isStopped(value: boolean) {
    this._isStopped = value;
  }

  /** Whether player should start on init. */
  @Input()
  get autoplay(): boolean {
    return this._autoplay;
  }

  set autoplay(value: BooleanInput) {
    this._autoplay = coerceBooleanProperty(value);
  }

  /** Whether the playing mode is reversed. */
  @Input()
  get progress(): boolean {
    return this._progress;
  }

  set progress(value: BooleanInput) {
    this._progress = coerceBooleanProperty(value);
  }

  /** Whether the playing mode is reversed. */
  @Input()
  get reversed(): boolean {
    return this._reversed;
  }

  set reversed(value: BooleanInput) {
    this._reversed = coerceBooleanProperty(value);
  }

  /** Whether the playing mode is reversed. */
  @Input()
  get speed(): number {
    return this._speed;
  }

  set speed(value: NumberInput) {
    this._speed = coerceNumberProperty(value);
  }

  @Input() pauseOn: 'hover' | 'click' | 'none' = 'hover';

  @ViewChild('progressBar', { static: true }) progressEl: ElementRef<HTMLElement>;

  constructor(@Optional() private carousel: Carousel, private builder: AnimationBuilder) {
  }

  ngAfterViewInit(): void {
    // Subscribe to hover and click events in carousel
    const carouselEl: HTMLElement = this.carousel.elementRef.nativeElement;

    this.player$.pipe(
      startWith({}),
      switchMap(() => {
        return this.pauseOn === 'hover'
          ? getHoverEvent(carouselEl)
          : this.pauseOn === 'click'
            ? getClickedEvent(carouselEl)
            : EMPTY;
      }),
      filter(() => this.player.hasStarted()),
      tap((isPaused: boolean) => {
        if (isPaused) {
          this.player.pause();
        } else {
          this.player.play();
        }
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

    if (this.autoplay) {
      this.play();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pauseOn?.currentValue && changes.pauseOn.currentValue !== changes.pauseOn.previousValue) {
      this.player$.next();
    }
  }

  ngOnDestroy(): void {
    this.isStopped = true;
    this.player?.destroy();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private onProgressComplete() {
    if (!this.isStopped) {
      if (this.reversed) {
        this.carousel.prevPage('smooth');
      } else {
        this.carousel.nextPage('smooth');
      }
      this.player.destroy();
      this.play();
    }
  }

  play(speed?: number): void {
    const factory: AnimationFactory = this.builder.build([
      style({ transform: 'translate3d(-100%, 0, 0)' }),
      animate(speed || this.speed, style({ transform: 'translate3d(0%, 0, 0)' }))
    ]);
    this.player = factory.create(this.progressEl.nativeElement);
    this.player.onDone(() => {
      this.onProgressComplete();
    });

    this.isPlaying$.next(true);
    this.player.play();
    this.isStopped = false;
  }

  stop(): void {
    this.isStopped = true;
    this.player.finish();
    this.isPlaying$.next(false);
  }
}

function getHoverEvent(el: HTMLElement): Observable<boolean> {
  return merge(
    fromEvent(el, 'mouseenter').pipe(map(() => true)),
    fromEvent(el, 'mouseleave').pipe(map(() => false))
  ) as Observable<boolean>;
}

function getClickedEvent(el: HTMLElement): Observable<boolean> {
  return merge(
    fromEvent(el, 'mousedown').pipe(map(() => true)),
    fromEvent(el, 'mouseup').pipe(map(() => false))
  ) as Observable<boolean>;
}
