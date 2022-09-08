import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryItem } from 'ng-gallery/next';
import { Pixabay } from '../../services/pixabay.service';

@Component({
  selector: 'app-zoom-carousel',
  templateUrl: './example-carousel-zoom.component.html',
  styleUrls: ['./example-carousel-zoom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCarouselZoomComponent implements OnInit {

  zoomWithWheel: boolean = true;

  readonly data$: Observable<GalleryItem[]>;

  constructor(pixabay: Pixabay) {
    this.data$ = pixabay.getHDImages('makeup');
    // this.data$ = pixabay.getHDImages('green');
  }
  // items: { color: string }[];
  items: { color1: string, color2: string }[];

  ngOnInit() {
  }

}
