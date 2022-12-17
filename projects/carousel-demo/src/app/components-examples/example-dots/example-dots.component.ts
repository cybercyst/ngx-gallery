import { Component, OnInit } from '@angular/core';
import * as Chance from 'chance';
import { CAROUSEL_ORIENTATION, CarouselBehavior } from 'ng-gallery/next';

@Component({
  selector: 'app-example-dots',
  templateUrl: './example-dots.component.html',
  styleUrls: ['./example-dots.component.scss']
})
export class ExampleDotsComponent implements OnInit {

  private readonly chance = new Chance();
  orientation = CAROUSEL_ORIENTATION.Horizontal;
  size = 30;

  position: 'left' | 'right' | 'top' | 'bottom' = 'top';
  centralised: boolean = true;
  compact: boolean = false;
  clickBehavior: CarouselBehavior = 'smooth';

  items: { color: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(20)).map(() => ({
      color: this.chance.color()
    }));
  }
}
