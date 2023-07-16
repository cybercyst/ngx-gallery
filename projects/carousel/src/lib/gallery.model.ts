import { InjectionToken } from '@angular/core';
import { CarouselItem, CarouselOrientation } from './carousel/carousel.model';

export interface GalleryState {
  loop?: boolean;
  total?: number;
  play?: boolean;
  perPage?: number;
  playSpeed?: number;
  playReverse?: boolean;
  hasNextItem?: boolean;
  hasPrevItem?: boolean;
  activeItem?: number;
  activePage?: number;
  pages?: CarouselItem[];
}

export interface GalleryItem {
  data?: any;
  type?: string;
}

export interface GalleryError {
  itemIndex: number;
  error: Error;
}

export enum ImageSize {
  Cover = 'cover',
  Contain = 'contain'
}

export enum LoadingStrategy {
  Preload = 'preload',
  Lazy = 'lazy',
  Default = 'default'
}

export enum ThumbnailsPosition {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export enum DotsPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum CounterPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ThumbnailsMode {
  Free = 'free',
  Strict = 'strict'
}

export enum SlidingDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum GalleryItemType {
  Image = 'image',
  Video = 'video',
  Youtube = 'youtube',
  Iframe = 'iframe'
}


export const GALLERY_CONFIG = new InjectionToken<GalleryConfig>('GALLERY_CONFIG');

export interface GalleryConfig {
  loop?: boolean;
  gestures?: boolean;
  autoPlay?: boolean;
  panSensitivity?: number;
  playerInterval?: number;
  orientation?: CarouselOrientation;
}

export const defaultConfig: GalleryConfig = {
  loop: true,
  gestures: true,
  autoPlay: false,
  playerInterval: 3000,
  // navIcon: `<?xml version="1.0" encoding="UTF-8"?><svg width="512px" height="512px" enable-background="new 0 0 240.823 240.823" version="1.1" viewBox="0 0 240.823 240.823" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m183.19 111.82l-108.3-108.26c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.3-108.26c4.68-4.691 4.68-12.511-0.012-17.19z" fill="#fff"/></svg>`,
  // loadingIcon: `<?xml version="1.0" encoding="UTF-8"?><svg stroke="#fff" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>`
};
