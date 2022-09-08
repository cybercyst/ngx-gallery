import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageZoomComponent } from './zoom.component';
import { PanzoomDirective, PanzoomImageDirective } from './panzoom.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageZoomComponent,  PanzoomDirective, PanzoomImageDirective],
  exports: [ImageZoomComponent,  PanzoomDirective, PanzoomImageDirective],
})
export class ZoomModule {
}
