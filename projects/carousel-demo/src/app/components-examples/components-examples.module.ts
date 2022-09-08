import { NgModule } from '@angular/core';
import { ZoomModule } from 'ng-gallery/next';
import { ExampleMaterialComponent } from './example-material/example-material.component';
import { ExampleCarouselImageComponent } from './example-carousel-images/example-carousel-image.component';
import {
  ExampleCentralisedCarouselComponent
} from './example-centralised-carousel/example-centralised-carousel.component';
import { SharedModule } from '../shared/shared.module';
import { ExampleDotsComponent } from './example-dots/example-dots.component';
import { ExampleThumbsComponent } from './example-thumb/example-thumbs.component';
import { ExampleNavComponent } from './example-nav/example-nav.component';
import { ExamplePlayerComponent } from './example-player/example-player.component';
import { ExampleCarouselComponent } from './example-carousel/example-carousel.component';
import { ExampleMultipleItemCarouselComponent } from './example-multiple-item-carousel/example-multiple-item-carousel.component';
import { ExampleLightboxCustomComponent } from './example-lightbox-custom/example-lightbox-custom.component';
import { ExampleCarouselZoomComponent } from './example-carousel-zoom/example-carousel-zoom.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExampleMaterialComponent,
    ExampleCarouselImageComponent,
    ExampleCentralisedCarouselComponent,
    ExampleDotsComponent,
    ExampleThumbsComponent,
    ExampleNavComponent,
    ExamplePlayerComponent,
    ExampleCarouselComponent,
    ExampleMultipleItemCarouselComponent,
    ExampleLightboxCustomComponent,
    ExampleCarouselZoomComponent
  ],
  imports: [
    SharedModule,
    ZoomModule,
    FormsModule
  ],
  exports: [
    ExampleMaterialComponent,
    ExampleCarouselImageComponent,
    ExampleCentralisedCarouselComponent,
    ExampleDotsComponent,
    ExampleThumbsComponent,
    ExampleNavComponent,
    ExamplePlayerComponent,
    ExampleCarouselComponent,
    ExampleMultipleItemCarouselComponent,
    ExampleLightboxCustomComponent,
    ExampleCarouselZoomComponent
  ]
})
export class ComponentsExamplesModule {
}
