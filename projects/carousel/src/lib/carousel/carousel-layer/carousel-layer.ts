import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  host: {
    '[attr.position]': 'position'
  },
  selector: 'carousel-layer, [carouselLayer]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./carousel-layer.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselLayer {
  @Input() position: 'left' | 'right' | 'top' | 'bottom';
}
