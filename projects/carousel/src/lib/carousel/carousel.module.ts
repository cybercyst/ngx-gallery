import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CarouselItemDirective, CarouselItemThumbDirective } from '../directives/carousel-item';
import { Carousel } from './carousel/carousel';
import { ResizeSensor } from '../directives/resize-sensor';
import {
  CarouselNav,
  CarouselNavNext,
  CarouselNavNextButton,
  CarouselNavPrev,
  CarouselNavPrevButton
} from './carousel-nav/carousel-nav';
import { CarouselNavButton } from './carousel-nav/carousel-nav-button';
import { CarouselThumbs } from './carousel-thumbs/carousel-thumbs';
import { CentralisedSlider } from './unsed-and-old/centralised-carousel/centralised-slider/centralised-slider';
import { CarouselPlayer } from './carousel-player/carousel-player';
import { CarouselCounter } from './carousel-counter/carousel-counter';
import { CarouselViewport } from './slider/viewport/carousel-viewport';
import { Slider } from './slider/slider';
import { CarouselPageTemplate } from './slider/carousel-page-template/carousel-page-template';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ScrollingModule
  ],
  declarations: [
    Carousel,
    ResizeSensor,
    CarouselNav,
    CarouselItemThumbDirective,
    CarouselNavButton,
    CarouselNavNext,
    CarouselNavNextButton,
    CarouselNavPrev,
    CarouselNavPrevButton,
    CarouselItemDirective,
    CarouselThumbs,
    CentralisedSlider,
    Slider,
    CarouselPlayer,
    CarouselCounter,
    CarouselViewport,
    CarouselPageTemplate
  ],
  exports: [
    Carousel,
    CarouselItemThumbDirective,
    CarouselNav,
    CarouselNavButton,
    CarouselNavNext,
    CarouselNavNextButton,
    CarouselNavPrev,
    CarouselNavPrevButton,
    CarouselItemDirective,
    CarouselThumbs,
    CentralisedSlider,
    CarouselPlayer,
    CarouselCounter,
  ]
})
export class CarouselModule {
}
