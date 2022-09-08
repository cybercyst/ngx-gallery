import { Component, OnInit } from '@angular/core';
import * as Chance from 'chance';
import { CAROUSEL_ORIENTATION, CarouselBehavior } from 'ng-gallery/next';

@Component({
  selector: 'example-centralised-carousel',
  templateUrl: './example-centralised-carousel.component.html',
  styleUrls: ['./example-centralised-carousel.component.scss']
})
export class ExampleCentralisedCarouselComponent implements OnInit {

  private readonly chance = new Chance();
  orientation = CAROUSEL_ORIENTATION.Horizontal;
  size = 60;
  selectedItem = 6;

  maxShownItems = 6;
  centralised: boolean = true;
  compact: boolean = true;
  clickBehavior: CarouselBehavior = 'smooth';
  selectedBehavior: CarouselBehavior = 'smooth';

  items: { color: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(30)).map(() => ({
      color: this.chance.color()
    }));
  }
}
