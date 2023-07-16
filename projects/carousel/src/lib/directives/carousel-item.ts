import { Directive, TemplateRef } from '@angular/core';
import { CarouselItem } from '../carousel/carousel.model';

@Directive({
  exportAs: 'carouselThumb',
  selector: '[carouselItemThumb]'
})
export class CarouselItemThumbDirective implements CarouselItem {

  index: number;

  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  exportAs: 'carouselItem',
  selector: '[carouselItem]'
})
export class CarouselItemDirective implements CarouselItem {

  index: number;

  constructor(public template: TemplateRef<any>) {
  }
}
