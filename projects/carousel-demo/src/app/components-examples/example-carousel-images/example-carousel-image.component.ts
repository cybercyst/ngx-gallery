import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { GalleryItem, ThumbnailsPosition } from 'ng-gallery/next';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pixabay } from '../../services/pixabay.service';

@Component({
  selector: 'app-example-carousel-images',
  templateUrl: './example-carousel-image.component.html',
  styleUrls: ['./example-carousel-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCarouselImageComponent implements OnInit {

  links = [
    'Basic Carousel',
    'Advanced Carousel',
    'Basic Carousel'
  ];

  readonly fruits$: Observable<GalleryItem[]>;
  readonly media$: Observable<any>;

  constructor(pixabay: Pixabay, mediaObserver: MediaObserver, private _title: Title) {
    this.fruits$ = pixabay.getHDImages('fruit', 6);
    this.media$ = mediaObserver.asObservable().pipe(
      map((res: MediaChange[]) => {
        if (res.some((x => x.mqAlias === 'sm' || x.mqAlias === 'xs'))) {
          return {
            thumbPosition: ThumbnailsPosition.Top,
            thumbWidth: 80,
            thumbHeight: 80
          };
        }
        return {
          thumbPosition: ThumbnailsPosition.Left,
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );
  }

  ngOnInit() {
    this._title.setTitle('Gallery | ng-gallery');
  }

  onStateChange(x, state) {
    console.log(x, state);
  }
}
