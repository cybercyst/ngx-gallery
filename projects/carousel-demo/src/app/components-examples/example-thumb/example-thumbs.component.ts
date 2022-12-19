import { Component, OnInit } from '@angular/core';
import { CAROUSEL_MODE, CAROUSEL_ORIENTATION, CarouselBehavior, CarouselMode } from 'ng-gallery/next';
import randomColor from 'randomcolor';

@Component({
  selector: 'example-carousel-thumbnails',
  templateUrl: './example-thumbs.component.html',
  styleUrls: ['./example-thumbs.component.scss']
})
export class ExampleThumbsComponent implements OnInit {

  orientation = CAROUSEL_ORIENTATION.Horizontal;
  size = 30;

  mode: CarouselMode = CAROUSEL_MODE.Strict;
  position: 'left' | 'right' | 'top' | 'bottom' = 'top';
  centralised: boolean = true;
  compact: boolean = false;
  clickBehavior: CarouselBehavior = 'smooth';

  items: { color: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(20)).map(() => ({
      color: randomColor()
    }));
  }
}
