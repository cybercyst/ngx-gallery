import { Component, OnInit } from '@angular/core';
// import randomColor from 'randomcolor';
import { Observable } from 'rxjs';
import { GalleryItem } from 'ng-gallery/next';
import { Pixabay } from '../../services/pixabay.service';

@Component({
  selector: 'app-example-lightbox-custom',
  templateUrl: './example-lightbox-custom.component.html',
  styleUrls: ['./example-lightbox-custom.component.scss']
})
export class ExampleLightboxCustomComponent implements OnInit {
  // items: { color1: string, color2: string }[];

  readonly data$: Observable<GalleryItem[]>;

  constructor(pixabay: Pixabay) {
    // this.data$ = pixabay.getHDImages('makeup');
    this.data$ = pixabay.getHDImages('skin');
  }

  ngOnInit() {
    // this.items = Array.from(new Array(18)).map(() => ({
    //   color1: randomColor(),
    //   color2: randomColor()
    // }));
  }
}
