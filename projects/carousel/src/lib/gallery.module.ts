import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { CarouselModule } from './carousel';

import { GalleryImageComponent } from './templates/gallery-image/gallery-image.component';
import { GalleryItemTextComponent } from './templates/gallery-item-text/gallery-item-text.component';
import { GalleryVideoComponent } from './templates/gallery-video.component';
import { GalleryIframeComponent } from './templates/gallery-iframe.component';

import { LazyImage } from './directives/lazy-image';

import { GALLERY_CONFIG, GalleryConfig } from './gallery.model';
import { NgAttr } from './directives/ng-attr.directive';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    CarouselModule
  ],
  declarations: [
    GalleryImageComponent,
    GalleryVideoComponent,
    GalleryIframeComponent,
    LazyImage,
    NgAttr,
    GalleryItemTextComponent
  ],
  exports: [
    GalleryImageComponent,
    GalleryItemTextComponent,
    LazyImage,
    CarouselModule
  ]
})
export class GalleryModule {
  static withConfig(config: GalleryConfig): ModuleWithProviders<GalleryModule> {
    return {
      ngModule: GalleryModule,
      providers: [
        {
          provide: GALLERY_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
