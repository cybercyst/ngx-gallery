import { Component, OnInit } from '@angular/core';
import { CAROUSEL_ORIENTATION } from 'ng-gallery/next';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-example-nav',
  templateUrl: './example-nav.component.html',
  styleUrls: ['./example-nav.component.scss']
})
export class ExampleNavComponent implements OnInit {
  toggle = true;
  orientation = CAROUSEL_ORIENTATION.Horizontal;
  size = 30;

  items: { color: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(20)).map(() => ({
      color: randomColor()
    }));
  }
}
