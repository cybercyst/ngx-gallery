import { Component, OnInit } from '@angular/core';
import randomColor from 'randomcolor';
import { CAROUSEL_MODE, CAROUSEL_ORIENTATION, CarouselBehavior, CarouselMode, CarouselOrientation } from 'ng-gallery/next';

@Component({
  selector: 'example-carousel',
  templateUrl: './example-carousel.component.html',
  styleUrls: ['./example-carousel.component.scss']
})
export class ExampleCarouselComponent implements OnInit {

  perPage: number = 1;

  selectedPage = 0;
  selectedItem = 0;
  cacheSize = 0;

  panSensitivity = 1;

  gestures: boolean = true;

  loop: boolean = false;

  selectedBehavior: CarouselBehavior = 'smooth';
  orientation: CarouselOrientation = CAROUSEL_ORIENTATION.Horizontal;
  mode: CarouselMode = CAROUSEL_MODE.Strict;

  items: { color1: string, color2: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(18)).map(() => ({
      color1: randomColor(),
      color2: randomColor()
    }));
  }

}
