import { ComponentPortal } from '@angular/cdk/portal';

export interface StoryRoute {
  title: string;
  path: string;
}

export enum DocContentType {
  Markdown = 'markdown',
  Component = 'component'
}

export interface DocSegment {
  type: DocContentType;
  name?: string;
  content: ComponentExampleData | string;
}

export interface ComponentData {
  title: string;
  docs?: DocSegment[];
}

export interface ComponentExampleData {
  component: ComponentPortal<unknown>;
  files?: {
    language: string;
    code: string;
  }[];
}
