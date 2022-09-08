import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';
// import Zoomist from 'zoomist';

@Component({
  selector: 'image-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageZoomComponent implements AfterViewInit, OnDestroy {

  // zoomist: Zoomist;

  @Input() src: string;

  @HostBinding('attr.data-zoomist-src') get image(): string {
    return this.src;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {

    // this.zoomist = new Zoomist(this.elementRef.nativeElement, {
    //   // optional parameters
    //   fill: 'cover',
    //   height: 'auto',
    //   maxRatio: false,
    //   // maxRatio: 4,
    //   // height: '60%',
    //   // if you need silder
    //   slider: true,
    //   // if you need zoomer
    //   zoomer: true,
    //   // event
    //   on: {
    //     ready() {
    //       console.log('Zoomist ready!')
    //     }
    //   }
    // });
  }

  ngOnDestroy(): void {
  //   this.zoomist?.destroy();
  }
}
