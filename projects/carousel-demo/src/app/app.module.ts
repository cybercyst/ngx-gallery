import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightModule } from 'ngx-highlightjs';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

import { AppRoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { GalleryMockDialog } from './shared/gallery-mock-dialog';
import { SharedModule } from './shared/shared.module';

import { GALLERY_CONFIG } from 'ng-gallery/next';

import { StoryModule } from './story';
import { GuideRoute, GuidesModule } from './guides';
import { StoryRoute } from './components-page/components.data';
import {
  ExampleCarouselComponent,
  ExampleCarouselImageComponent,
  ExampleCentralisedCarouselComponent,
  ExampleDotsComponent,
  ExampleLightboxCustomComponent,
  ExampleMaterialComponent,
  ExampleMultipleItemCarouselComponent,
  ExampleNavComponent,
  ExamplePlayerComponent,
  ExampleThumbsComponent
} from './components-examples';
import {
  ExampleCarouselZoomComponent
} from './components-examples/example-carousel-zoom/example-carousel-zoom.component';

// =================
// ICONS
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faExternalLinkAlt,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faRotateBack, faHand
} from '@fortawesome/free-solid-svg-icons';

const storyRoutes: StoryRoute[] = [
  {
    title: 'Carousel',
    path: 'carousel'
  },
  {
    title: 'Centralised Carousel',
    path: 'centralised-carousel'
  },
  {
    title: 'Lightbox',
    path: 'lightbox'
  },
  {
    title: 'Carousel Dots',
    path: 'dots'
  },
  {
    title: 'Carousel Thumbnails',
    path: 'thumbs'
  },
  {
    title: 'Carousel Navigation',
    path: 'nav'
  },
  {
    title: 'Carousel Player',
    path: 'player'
  },
  {
    title: 'Carousel Zoom',
    path: 'zoom'
  }
];

const guideRoutes: GuideRoute[] = [
  {
    title: 'Getting Started',
    description: 'Add ng-gallery to your project!',
    path: 'getting-started'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    GalleryMockDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    HighlightModule,
    StoryModule.forRoot({
      routes: storyRoutes,
      markdownDirPath: 'assets/docs',
      documentationPath: 'assets/docs/documentation.json',
      components: [
        ExampleCarouselImageComponent,
        ExampleCentralisedCarouselComponent,
        ExampleMaterialComponent,
        ExampleDotsComponent,
        ExampleThumbsComponent,
        ExampleNavComponent,
        ExamplePlayerComponent,
        ExampleCarouselComponent,
        ExampleMultipleItemCarouselComponent,
        ExampleLightboxCustomComponent,
        ExampleCarouselZoomComponent
      ]
    }),
    GuidesModule.forRoot({
      markdownDirPath: 'assets/guides',
      routes: guideRoutes
    })
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        imageSize: 'cover'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTwitter, faGithub, faExternalLinkAlt, faHand, faRotateBack,  faMagnifyingGlassPlus, faMagnifyingGlassMinus);
  }
}
