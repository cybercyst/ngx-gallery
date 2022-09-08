import { ModuleWithProviders, NgModule } from '@angular/core';
import { STORY_CONFIG, StoryConfig } from './story.model';

@NgModule()
export class StoryModule {
  static forRoot(config?: StoryConfig): ModuleWithProviders<StoryModule> {
    return {
      ngModule: StoryModule,
      providers: [
        {
          provide: STORY_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
