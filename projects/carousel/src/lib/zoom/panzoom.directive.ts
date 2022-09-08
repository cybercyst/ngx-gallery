import {
  Directive,
  Optional,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  NgZone,
  ElementRef
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import Panzoom, { PanzoomObject, PanzoomOptions } from '@panzoom/panzoom';
import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Carousel } from '../carousel/carousel/carousel';


@Directive({
  exportAs: 'panzoomImage',
  selector: '[panzoomImage]'
})
export class PanzoomImageDirective implements AfterViewInit, OnChanges {

  private isInit: boolean;

  @Input() isActive: boolean;

  @Output() activeItem = new EventEmitter<HTMLElement>();

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.isInit = true;
  }

  ngOnChanges(): void {
    if (this.isActive) {
      this.activeItem.emit(this.element);
      console.log('activeItem.emit => ', this.element);
    }
  }
}

@Directive({
  exportAs: 'panzoom',
  selector: '[panzoom]'
})
export class PanzoomDirective implements AfterViewInit, OnDestroy {

  panzoom: PanzoomObject;

  clickType: 'zoom-in' | 'zoom-out' | 'grab' | 'default' = 'default';

  private _zoomWithWheel: boolean;

  private wheelSubscription: Subscription;

  @Input() resetOnItemChange: boolean = true;

  @Input() disablePan: boolean = true;

  @Input() minScale: number = 1;

  @Input()
  get zoomWithWheel(): boolean {
    return this._zoomWithWheel;
  }
  set zoomWithWheel(value: any) {
    this._zoomWithWheel = coerceBooleanProperty(value);
    this._zoomWithWheel ? this.subscribeWheel() : this.unsubscribeWheel();
  }

  constructor(private el: ElementRef,
              private zone: NgZone,
              @Optional() private carousel: Carousel) {
  }

  ngAfterViewInit(): void {
    if (!this.wheelSubscription && this.zoomWithWheel) {
      this.subscribeWheel();
    }
  }

  setElement(element): void {
    this.panzoom?.destroy();

    this.panzoom = Panzoom(element, {
      animate: true,
      disablePan: this.disablePan,
      minScale: this.minScale,
      cursor: this.clickType,
    });
  }

  setOptions(options: PanzoomOptions): void {
    this.panzoom.setOptions(options);
  }

  reset(options?: PanzoomOptions): void {
    this.panzoom?.reset(options);
  }

  zoomIn(): void {
    this.panzoom.setOptions({ cursor: 'zoom-in' });
    this.panzoom.zoomIn();
  }

  zoomOut(): void {
    this.panzoom.setOptions({ cursor: 'zoom-out' });
    this.panzoom.zoomOut();
  }

  click(): void {
    switch (this.clickType) {
      case 'zoom-in':
        this.zoomIn();
        break;
      case 'zoom-out':
        this.zoomOut();
        break;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeWheel();
    this.panzoom?.destroy();
  }

  private subscribeWheel(): void {
    this.zone.runOutsideAngular(() => {
      this.wheelSubscription = fromEvent(this.el.nativeElement, 'wheel').pipe(
        tap((e: WheelEvent) => {
          this.panzoom.zoomWithWheel(e);
          const scale = this.panzoom.getScale();
          if (scale <= this.minScale) {
            this.reset();
          }
        })
      ).subscribe();
    });
  }

  private unsubscribeWheel(): void {
    this.wheelSubscription?.unsubscribe();
  }
}
