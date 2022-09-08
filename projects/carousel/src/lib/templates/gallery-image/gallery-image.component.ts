import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnDestroy,
  TemplateRef,
  Host,
  Optional
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { CarouselItemThumbDirective } from '../../directives/carousel-item';

@Component({
  selector: 'gallery-image',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GalleryImageComponent implements OnDestroy {

  /** Stream that emits the state */
  private readonly _state = new BehaviorSubject<'loading' | 'success' | 'failed'>('loading');
  readonly state = this._state.asObservable();

  /** Progress value */
  progress = 0;

  /** Is thumbnail */
  @Input() isThumbnail: boolean;

  /** Image source URL */
  @Input() src: string;
  /** Loaded image URL */
  imageUrl: string;

  /** Custom loader template */
  @Input() loadingTemplate: TemplateRef<any>;

  /** Custom error template */
  @Input() errorTemplate: TemplateRef<any>;

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<Error>();
  /** loading error */
  loadError: Error;

  @HostBinding('class.g-image-loaded') get imageLoadSuccess(): boolean {
    return !!this.imageUrl;
  }

  @HostBinding('class.g-image-error') get imageLoadFailed(): boolean {
    return !!this.loadError;
  }

  constructor(@Optional() @Host() host: CarouselItemThumbDirective) {
    this.isThumbnail = host instanceof CarouselItemThumbDirective;
  }

  ngOnDestroy() {
    this._state.complete();
  }

  onProgress({ loaded, total }: { loaded: number, total: number }) {
    this.progress = loaded * 100 / total;
  }

  onLoaded(blobUrl: string) {
    // this.imageUrl = this._sanitizer.bypassSecurityTrustStyle(`url("${ blobUrl }")`);
    this._state.next('success');
  }

  onError(err: Error) {
    this.loadError = err;
    this._state.next('failed');
    this.error.emit(err);
  }

}
