import { Component, OnInit } from '@angular/core';
import { CAROUSEL_ORIENTATION, CarouselBehavior } from 'ng-gallery/next';
import randomColor from 'randomcolor';

@Component({
  selector: 'example-carousel-thumbnails',
  templateUrl: './example-thumbs.component.html',
  styleUrls: ['./example-thumbs.component.scss']
})
export class ExampleThumbsComponent implements OnInit {

  orientation = CAROUSEL_ORIENTATION.Horizontal;
  size = 30;

  mode: 'default' | 'center-method' = 'center-method';
  position: 'left' | 'right' | 'top' | 'bottom' = 'top';
  centralised: boolean = true;
  compact: boolean = true;
  clickBehavior: CarouselBehavior = 'smooth';

  items: { color: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(20)).map(() => ({
      color: randomColor()
    }));
  }
}
