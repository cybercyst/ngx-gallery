import {
  Component,
  Optional,
  HostBinding,
  ElementRef,
  AfterViewChecked,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Carousel } from '../carousel/carousel';
import { CarouselThumbs } from '../carousel-thumbs/carousel-thumbs';

@Component({
  selector: 'carousel-counter',
  templateUrl: './carousel-counter.html',
  styleUrls: ['./carousel-counter.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselCounter implements AfterViewChecked {

  constructor(private el: ElementRef,
              private sanitizer: DomSanitizer,
              @Optional() public carousel: Carousel,
              @Optional() private carouselThumbs: CarouselThumbs) {
  }

  @HostBinding('attr.style')
  get valueAsStyle(): any {
    return this.sanitizer.bypassSecurityTrustStyle(`--carousel-player-space: ${ this.carouselThumbs?.itemHeight }px`);
  }

  ngAfterViewChecked(): void {
    if (this.carouselThumbs) {
      (this.el.nativeElement as HTMLElement).setAttribute('style', `--carousel-player-space: ${ this.carouselThumbs?.itemHeight }px`);
    }
  }
}
