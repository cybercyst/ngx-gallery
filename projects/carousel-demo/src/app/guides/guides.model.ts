import { InjectionToken } from '@angular/core';

export interface GuideData {
  title: string;
  content?: string;
}

export interface GuideRoute {
  title: string;
  description: string;
  path: string;
}

export interface GuideConfig {
  routes: GuideRoute[];
  markdownDirPath: string;
}

export const GUIDES_CONFIG = new InjectionToken<GuideConfig>('GUIDES_CONFIG');
