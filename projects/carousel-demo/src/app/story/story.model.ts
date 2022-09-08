import { InjectionToken } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DocContentType, StoryRoute } from '../components-page/components.data';

export interface StoryConfig {
  routes: StoryRoute[];
  components: ComponentType<unknown>[];
  markdownDirPath: string;
  documentationPath: string;
}

export interface ComponentData {
  title: string;
  docs?: DocSegment[];
}

export interface StoryComponent {
  path: string;
  component: ComponentType<unknown>;
}

export interface StoryComponent {
  component: ComponentType<unknown>;
  files?: {
    language: string;
    code: string;
  }[];
}

export interface DocSegment {
  type: DocContentType;
  name?: string;
  content: ComponentType<unknown> | string;
}

// export interface StoryComponent {
//   path: string;
//   load: Promise<any>;
// }

export const STORY_CONFIG = new InjectionToken<StoryConfig>('STORY_CONFIG');
