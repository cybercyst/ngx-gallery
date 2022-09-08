import { Component, OnInit } from '@angular/core';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-example-player',
  templateUrl: './example-player.component.html',
  styleUrls: ['./example-player.component.scss']
})
export class ExamplePlayerComponent implements OnInit {

  items: { color: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(10)).map(() => ({
      color: randomColor()
    }));
  }
}
