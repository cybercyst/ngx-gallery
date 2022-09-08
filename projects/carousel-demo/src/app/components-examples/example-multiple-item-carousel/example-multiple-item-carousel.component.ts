import { Component, OnInit } from '@angular/core';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-example-multiple-item-carousel',
  templateUrl: './example-multiple-item-carousel.component.html',
  styleUrls: ['./example-multiple-item-carousel.component.scss']
})
export class ExampleMultipleItemCarouselComponent implements OnInit {

  items: { color1: string, color2: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(18)).map(() => ({
      color1: randomColor(),
      color2: randomColor()
    }));
  }

}
