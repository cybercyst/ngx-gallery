import { Component, OnInit } from '@angular/core';
import randomColor from 'randomcolor';
import { CAROUSEL_MODE, CAROUSEL_ORIENTATION, CarouselBehavior, CarouselMode, CarouselOrientation } from 'ng-gallery/next';

@Component({
  selector: 'example-carousel',
  templateUrl: './example-carousel.component.html',
  styleUrls: ['./example-carousel.component.scss']
})
export class ExampleCarouselComponent implements OnInit {

  itemSize: string = '';

  perPage: number = 3;

  selectedPage = 0;
  selectedItem = 0;
  cacheSize = 0;

  panSensitivity = 1;

  gestures: boolean = true;

  loop: boolean = false;

  selectedBehavior: CarouselBehavior = 'smooth';
  orientation: CarouselOrientation = CAROUSEL_ORIENTATION.Horizontal;
  mode: CarouselMode = CAROUSEL_MODE.Strict;

  items: { color1: string, color2: string, width: number, height: number }[];

  ngOnInit() {
    this.items = Array.from(new Array(20)).map(() => ({
      color1: randomColor(),
      color2: randomColor(),
      width: getRandomInt(200, 500),
      height: getRandomInt(200, 500)
    }));
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
