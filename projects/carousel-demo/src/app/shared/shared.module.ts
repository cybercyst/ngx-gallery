import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GalleryModule, LightboxModule } from 'ng-gallery/next';
import { HighlightModule } from 'ngx-highlightjs';

import { MaterialModule } from '../material.module';

import { KeysPipe } from './pipes/keys.pipe';
import { BadgesComponent } from './badges/badges.component';

import { FooterComponent } from './footer/footer.component';
import { HlCodeComponent } from './hl-code/hl-code.component';
import { MenuComponent } from './menu/menu.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { NoteComponent } from './note/note.component';
import { HtmlSanitizerPipe } from './pipes/html-sanitizer.pipe';
import { ErrorComponent } from './error/error.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { PortalModule } from '@angular/cdk/portal';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    SectionTitleComponent,
    BadgesComponent,
    NoteComponent,
    MenuComponent,
    FooterComponent,
    ErrorComponent,
    HlCodeComponent,
    KeysPipe,
    HtmlSanitizerPipe,
    ExampleViewerComponent,
    CodeSnippetComponent,
    DocViewerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ObserversModule,
    MaterialModule,
    HighlightModule,
    PlatformModule,
    FlexLayoutModule,
    FontAwesomeModule,
    GalleryModule,
    LightboxModule,
    PortalModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HighlightModule,
    MaterialModule,
    ObserversModule,
    FlexLayoutModule,
    FontAwesomeModule,
    SectionTitleComponent,
    HlCodeComponent,
    MenuComponent,
    FooterComponent,
    BadgesComponent,
    NoteComponent,
    GalleryModule,
    LightboxModule,
    HtmlSanitizerPipe,
    ErrorComponent,
    ExampleViewerComponent,
    CodeSnippetComponent,
    HeaderComponent
  ]
})
export class SharedModule {
}
