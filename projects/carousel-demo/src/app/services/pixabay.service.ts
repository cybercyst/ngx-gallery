import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Chance from 'chance';
import { GalleryItem, ImageItem } from 'ng-gallery/next';

import { Hit2, PixabayHDModel } from './pixabay.model';

@Injectable({
  providedIn: 'root'
})
export class Pixabay {

  private readonly chance = new Chance();
  private readonly API_KEY = '560162-704dd2880c027f22c62ab7941';

  constructor(private _http: HttpClient) {
  }

  getHDImages(key: string, count: number = 20): Observable<GalleryItem[]> {
    const URL = `https://pixabay.com/api/?key=${ this.API_KEY }&q=${ encodeURIComponent(key) }&response_group=high_resolution&editors_choice=true&per_page=${ count }`;
    return this._http.get(URL).pipe(
      map((res: PixabayHDModel) => {
        return res.hits.map((item: Hit2) => new ImageItem({
          src: item.largeImageURL,
          thumb: item.previewURL,
          fullHDURL: item.fullHDURL,
          text: this.chance.paragraph(),
          title: this.chance.name()
        }));
      }),
      shareReplay(1)
    );
  }
}
