import { Directive, ElementRef, Input } from '@angular/core';
import { ThumbnailsPosition } from '../gallery.model';
import { CarouselOrientation } from '../carousel/carousel.model';

@Directive({ selector: '[ngAttr]' })
export class NgAttr {

  constructor(private el: ElementRef) {
  }

  @Input() set ngAttr(attrs: GalleryState) {
    for (const [key, value] of Object.entries(attrs)) {
      (this.el.nativeElement as HTMLElement).setAttribute(key, value);
    }
  }
}

export interface GalleryState {
  thumbPosition?: ThumbnailsPosition;
  orientation?: CarouselOrientation;
}
