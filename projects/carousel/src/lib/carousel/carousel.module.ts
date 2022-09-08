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
import { CarouselDots } from './carousel-dots/carousel-dots';
import { CarouselThumbs } from './carousel-thumbs/carousel-thumbs';
import { CarouselCore } from './core/carousel-core';
import { TapClick } from '../directives/tap-click';
import { CentralisedSlider } from './centralised-carousel/centralised-slider/centralised-slider';
import { VerticalCentralisedCarousel } from './centralised-carousel/vertical-centralised-carousel';
import { HorizontalCentralisedCarousel } from './centralised-carousel/horizontal-centralised-carousel';
import { Slider } from './carousel/slider/slider';
import { CarouselPlayer } from './carousel-player/carousel-player';
import { CarouselCounter } from './carousel-counter/carousel-counter';
import { CarouselLayer } from './carousel-layer/carousel-layer';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ScrollingModule
  ],
  declarations: [
    CarouselCore,
    Carousel,
    ResizeSensor,
    TapClick,
    CarouselNav,
    CarouselItemThumbDirective,
    CarouselNavButton,
    CarouselNavNext,
    CarouselNavNextButton,
    CarouselNavPrev,
    CarouselNavPrevButton,
    CarouselItemDirective,
    CarouselDots,
    CarouselThumbs,
    CentralisedSlider,
    VerticalCentralisedCarousel,
    HorizontalCentralisedCarousel,
    Slider,
    CarouselPlayer,
    CarouselCounter,
    CarouselLayer
  ],
  exports: [
    Carousel,
    TapClick,
    CarouselItemThumbDirective,
    CarouselNav,
    CarouselNavButton,
    CarouselNavNext,
    CarouselNavNextButton,
    CarouselNavPrev,
    CarouselNavPrevButton,
    CarouselItemDirective,
    CarouselDots,
    CarouselThumbs,
    CentralisedSlider,
    VerticalCentralisedCarousel,
    HorizontalCentralisedCarousel,
    CarouselPlayer,
    CarouselCounter,
    CarouselLayer
  ]
})
export class CarouselModule {
}
