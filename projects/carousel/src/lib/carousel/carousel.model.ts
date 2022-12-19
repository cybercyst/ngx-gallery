import { InjectionToken, TemplateRef } from '@angular/core';

export interface CarouselConfig {
  sensorDisabled?: boolean;
  sensorThrottleTime?: number;
  mode?: CarouselMode;
  loop?: boolean;
  perPage?: number;
  gestures?: boolean;
  animated?: boolean;
  orientation?: CarouselOrientation;
  panSensitivity?: number;
  cacheSize?: number;
}

export enum CAROUSEL_POSITION {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom'
}

export const CAROUSEL_DEFAULT_OPTIONS = new InjectionToken<CarouselConfig>('CAROUSEL_DEFAULT_OPTIONS');

export enum CAROUSEL_ORIENTATION {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum CAROUSEL_MODE {
  Free = 'free',
  Strict = 'strict'
}

export enum CAROUSEL_BEHAVIOR {
  Smooth = 'smooth',
  Auto = 'auto'
}

export type CarouselPosition =
  CAROUSEL_POSITION.Top
  | CAROUSEL_POSITION.Bottom
  | CAROUSEL_POSITION.Left
  | CAROUSEL_POSITION.Right;

/** The state of each step. */
export type CarouselOrientation = CAROUSEL_ORIENTATION.Horizontal | CAROUSEL_ORIENTATION.Vertical;
export type CarouselMode = CAROUSEL_MODE.Strict | CAROUSEL_MODE.Free;
export type CarouselBehavior = 'smooth' | 'auto';

export interface CarouselState {
  loop?: boolean;
  total?: number;
  perPage?: number;
  hasNextItem?: boolean;
  hasPrevItem?: boolean;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  activeItem?: number;
  activePage?: number;
  pages?: CarouselPage[];
  behavior?: CarouselBehavior;
}

export interface CarouselScrollEvent {
  index: number;
  behavior: CarouselBehavior;
}

export interface CarouselActionEvent {
  action: number | 'next' | 'prev';
  behavior: CarouselBehavior;
}


/** Carousel item */
export interface CarouselItem {
  index: number;
  template: TemplateRef<any>;
}

/** Carousel page */
export interface CarouselPage {
  index: number;
  items: CarouselItem[];
}
