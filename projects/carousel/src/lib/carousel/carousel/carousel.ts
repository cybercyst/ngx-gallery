import {
  Component,
  Optional,
  Inject,
  Input,
  ContentChildren,
  ElementRef,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { CAROUSEL_DEFAULT_OPTIONS, CarouselConfig, CarouselOrientation } from '../carousel.model';
import { CarouselCore } from './carousel-core';
import { CarouselLayer } from '../carousel-layer/carousel-layer';

interface CarouselLayerArgs {
  left: number;
  right: number;
  bottom: number;
  top: number;
}

@Component({
  host: {
    '[style.width]': 'orientation === CarouselOrientation.Horizontal ? "100%" : itemBlockSize + "px"',
    '[style.height]': 'orientation === CarouselOrientation.Horizontal ? itemBlockSize + "px" : "100%"',
  },
  exportAs: 'carousel',
  selector: 'carousel',
  templateUrl: 'carousel.html',
  styleUrls: ['./carousel.scss'],
  providers: [{ provide: CarouselCore, useExisting: Carousel }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel extends CarouselCore {

  @Input() orientation: CarouselOrientation = this.config.orientation;

  @ContentChildren(CarouselLayer) layers: QueryList<CarouselLayer>;

  constructor(@Optional() @Inject(CAROUSEL_DEFAULT_OPTIONS) protected customConfig: CarouselConfig, el: ElementRef<HTMLElement>) {
    super(customConfig, el);
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
    // Query carousel items in content to attach them in the slider
    this.contentItems.notifyOnChanges();
    this.contentItems.changes.pipe(
      tap(() => this.loadItems()),
      takeUntil(this.destroyed$)
    ).subscribe();

    this.layers.changes.pipe(
      tap(() => this.updateLayout()),
      takeUntil(this.destroyed$)
    ).subscribe();
    this.layers.notifyOnChanges();
  }

  private initAreas(layers: CarouselLayerArgs): string {
    const top = () => `"${ layers.left ? '. ' : '' }top${ layers.right ? ' .' : '' }"`;
    const bottom = () => `"${ layers.left ? '. ' : '' }bottom${ layers.right ? ' .' : '' }"`;
    return `${ layers.top ? top() : '' }
    "${ layers.left ? 'left ' : '' }center${ layers.right ? ' right' : '' }"
    ${ layers.bottom ? bottom() : '' }`;
  }

  private initCols(layers: CarouselLayerArgs): string {
    return `${ layers.left ? 'auto' : '' } minmax(0, 1fr) ${ layers.right ? 'auto' : '' } `;
  }

  private initRows(layers: CarouselLayerArgs): string {
    return `${ layers.top ? 'auto' : '' } minmax(0, 1fr) ${ layers.bottom ? 'auto' : '' } `;
  }

  updateLayout(): void {
    let layers: CarouselLayerArgs = {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0
    };
    this.layers.toArray()
      .filter((layer: CarouselLayer) => !layer.compact)
      .forEach((layer: CarouselLayer) => layers[layer.position]++);

    const areas = this.initAreas(layers);
    const rows = this.initRows(layers);
    const cols = this.initCols(layers);

    this.elementRef.nativeElement.style.gridTemplateAreas = areas;
    this.elementRef.nativeElement.style.gridTemplateRows = rows;
    this.elementRef.nativeElement.style.gridTemplateColumns = cols;
  }

}
