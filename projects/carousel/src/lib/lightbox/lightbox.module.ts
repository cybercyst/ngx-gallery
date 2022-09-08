import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformModule } from '@angular/cdk/platform';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { GalleryModule } from '../gallery.module';

import { LightboxComponent } from './lightbox.component';
import { LightboxDirective } from './lightbox.directive';
import { LightboxConfig, LIGHTBOX_CONFIG } from './lightbox.model';
import { LightboxCloseButton } from './lightbox-close-button';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    GalleryModule,
    PlatformModule,
    A11yModule
  ],
  declarations: [
    LightboxComponent,
    LightboxDirective,
    LightboxCloseButton
  ],
  exports: [
    LightboxComponent,
    LightboxDirective,
    LightboxCloseButton
  ]
})
export class LightboxModule {
  static withConfig(config: LightboxConfig): ModuleWithProviders<LightboxModule> {
    return {
      ngModule: LightboxModule,
      providers: [
        {
          provide: LIGHTBOX_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
