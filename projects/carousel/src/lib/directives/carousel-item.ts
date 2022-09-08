import { Directive, TemplateRef } from '@angular/core';
import { CarouselItem } from '../carousel/carousel.model';

@Directive({
  exportAs: 'carouselThumb',
  selector: 'ng-template[carouselItemThumb], ng-template[carousel-item-thumb]'
})
export class CarouselItemThumbDirective implements CarouselItem {

  index: number;

  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  exportAs: 'carouselItem',
  selector: 'ng-template[carouselItem], ng-template[carouse-iItem]'
})
export class CarouselItemDirective implements CarouselItem {

  index: number;

  constructor(public template: TemplateRef<any>) {
  }
}
