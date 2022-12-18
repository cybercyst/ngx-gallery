import {
  Component,
  Optional,
  Inject,
  Input,
  ContentChildren,
  ElementRef,
  QueryList,
  ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
import { CAROUSEL_CONFIG, CarouselBehavior, CarouselConfig } from '../carousel.model';
import { CarouselCore } from '../core/carousel-core';
import { CarouselLayer } from '../carousel-layer/carousel-layer';
import { takeUntil, tap } from 'rxjs/operators';

interface CarouselLayerArgs {
  left: number;
  right: number;
  bottom: number;
  top: number;
}

@Component({
  host: {
    '[style.width]': 'orientation === CarouselOrientation.Horizontal ? "66vw" : itemCrossSize + "px"',
    '[style.height]': 'orientation === CarouselOrientation.Horizontal ? itemCrossSize + "px" : "100%"',
    '[attr.layers]': 'layers?.length'
  },
  exportAs: 'carousel',
  selector: 'carousel',
  templateUrl: 'carousel.html',
  styleUrls: ['./carousel.scss'],
  providers: [{ provide: CarouselCore, useExisting: Carousel }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel extends CarouselCore {

  @Input() itemSize: number | string | 'auto';

  @Input() itemCrossSize: string | number | 'auto';

  @Input() centralized: boolean;

  @ContentChildren(CarouselLayer) layers: QueryList<CarouselLayer>;

  constructor(@Optional() @Inject(CAROUSEL_CONFIG) protected customConfig: CarouselConfig, el: ElementRef<HTMLElement>) {
    super(customConfig, el);
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
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
    console.log('updateLayout', areas);
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

}
