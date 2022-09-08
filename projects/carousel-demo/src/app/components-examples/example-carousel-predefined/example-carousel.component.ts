import { Component, OnInit } from '@angular/core';
import randomColor from 'randomcolor';

@Component({
  selector: 'example-carousel',
  templateUrl: './example-carousel.component.html',
  styleUrls: ['./example-carousel.component.scss']
})
export class ExampleCarouselComponent implements OnInit {

  items: { color1: string, color2: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(18)).map(() => ({
      color1: randomColor(),
      color2: randomColor()
    }));
  }

}
