import {
  Component,
  Optional,
  HostBinding,
  ElementRef,
  AfterViewChecked,
  ChangeDetectionStrategy, Input
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Carousel } from '../carousel/carousel';
import { CarouselThumbs } from '../carousel-thumbs/carousel-thumbs';
import { CarouselLayer } from '../carousel-layer/carousel-layer';

@Component({
  selector: 'carousel-counter',
  templateUrl: './carousel-counter.html',
  styleUrls: ['./carousel-counter.scss'],
  providers: [{ provide: CarouselLayer, useExisting: CarouselCounter }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselCounter extends CarouselLayer implements AfterViewChecked {

  /**
   * The position of the dots in the carousel
   */
  @Input() position: 'top' | 'bottom' = 'top';

  constructor(private el: ElementRef<HTMLElement>,
              private sanitizer: DomSanitizer,
              @Optional() public host: Carousel,
              @Optional() private carouselThumbs: CarouselThumbs) {
    super(host);
  }

  @HostBinding('attr.style')
  get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--carousel-player-space: ${ this.carouselThumbs?.itemBlockSize }px`);
  }

  ngAfterViewChecked(): void {
    if (this.carouselThumbs) {
      this.el.nativeElement.setAttribute('style', `--carousel-player-space: ${ this.carouselThumbs?.itemBlockSize }px`);
    }
  }
}
