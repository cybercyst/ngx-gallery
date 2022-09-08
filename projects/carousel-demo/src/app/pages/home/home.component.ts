import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { GalleryItem } from 'ng-gallery/next';
import { fadeOut, fadeIn } from 'ng-animate';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pixabay } from '../../services/pixabay.service';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  host: {
    'class': 'page'
  },
  animations: [
    trigger('fade', [
      transition('out => in', useAnimation(fadeIn)),
      transition('in => out', useAnimation(fadeOut))
    ])
  ],
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  form = new UntypedFormControl('', [Validators.required, Validators.email]);

  readonly camel$: Observable<GalleryItem[]>;
  readonly media$: Observable<any>;

  constructor(pixabay: Pixabay, mediaObserver: MediaObserver, private _title: Title) {
    this.camel$ = pixabay.getHDImages('nature', 38);
    this.media$ = mediaObserver.asObservable().pipe(
      map((res: MediaChange[]) => {
        if (res.some((x => x.mqAlias === 'sm' || x.mqAlias === 'xs'))) {
          return {
            thumbWidth: 80,
            thumbHeight: 80
          };
        }
        return {
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );
  }

  ngOnInit() {
    this._title.setTitle('Home | ng-gallery');
  }

  addEmail(email: string) {
    console.log(email);
  }
}
