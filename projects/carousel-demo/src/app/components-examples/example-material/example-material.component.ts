import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryItem } from 'ng-gallery/next';
import randomColor from 'randomcolor';
import { Pixabay } from '../../services/pixabay.service';

@Component({
  selector: 'app-example-material',
  templateUrl: './example-material.component.html',
  styleUrls: ['./example-material.component.scss']
})
export class ExampleMaterialComponent implements OnInit {

  readonly data$: Observable<GalleryItem[]>;

  constructor(pixabay: Pixabay) {
    // this.data$ = pixabay.getHDImages('makeup');
    this.data$ = pixabay.getHDImages('green');
  }
  // items: { color: string }[];
  items: { color1: string, color2: string }[];

  ngOnInit() {
    this.items = Array.from(new Array(18)).map(() => ({
      color1: randomColor(),
      color2: randomColor()
    }));
  }

}
