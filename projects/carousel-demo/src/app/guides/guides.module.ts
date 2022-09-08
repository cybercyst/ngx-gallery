import { ModuleWithProviders, NgModule } from '@angular/core';
import { GuideConfig, GUIDES_CONFIG } from './guides.model';

@NgModule()
export class GuidesModule {
  static forRoot(config?: GuideConfig): ModuleWithProviders<GuidesModule> {
    return {
      ngModule: GuidesModule,
      providers: [
        {
          provide: GUIDES_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
