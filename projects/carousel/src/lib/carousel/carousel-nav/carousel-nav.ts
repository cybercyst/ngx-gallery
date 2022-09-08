import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  forwardRef,
  Inject,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { CAROUSEL_BEHAVIOR, CarouselBehavior } from '../carousel.model';
import { Carousel } from '../carousel/carousel';

@Directive({
  selector: '[carouselNavNextButton], [carousel-nav-next-button]',
  host: {
    '[disabled]': '!(parent.host.snapshot.loop || parent.host.snapshot.hasNextPage)',
    '(click)': 'parent.host.nextPage(parent.clickBehavior)'
  }
})
export class CarouselNavNextButton {
  constructor(@Inject(forwardRef(() => CarouselNav)) public parent: CarouselNav) {
  }
}

@Directive({
  selector: '[carouselNavPrevButton], [carousel-nav-prev-button]',
  host: {
    '[disabled]': '!(parent.host.snapshot.loop || parent.host.snapshot.hasPrevPage)',
    '(click)': 'parent.host.prevPage(parent.clickBehavior)'
  }
})
export class CarouselNavPrevButton {
  constructor(@Inject(forwardRef(() => CarouselNav)) public parent: CarouselNav) {
  }
}

@Directive({
  selector: '[carouselNavNext], [carousel-nav-next]'
})
export class CarouselNavNext {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[carouselNavPrev], [carousel-nav-prev]'
})
export class CarouselNavPrev {
  constructor(public template: TemplateRef<any>) {
  }
}

@Component({
  selector: 'carousel-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './carousel-nav.html',
  styleUrls: ['./carousel-nav.scss']
})
export class CarouselNav {

  classes: any;

  /** The space between the nav button and carousel edge */
  @Input() space = 0;
  @Input() clickBehavior: CarouselBehavior = CAROUSEL_BEHAVIOR.Smooth;

  /** Nav buttons custom template */
  @ContentChild(CarouselNavNext) customNext: CarouselNavNext;
  @ContentChild(CarouselNavPrev) customPrev: CarouselNavPrev;

  constructor(@Optional() public host: Carousel) {
  }
}
