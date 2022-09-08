import { animationFrameScheduler } from 'rxjs';

export interface SmoothScrollToOptions {
  duration?: number;
  easeFunc?: SmoothScrollEaseFunc;
}

export type SmoothScrollEaseFunc = (t: number, s: number, c: number, d: number) => number;

export interface SmoothScrollOptions {
  offsetLeft?: number;
  offsetTop?: number;
  left?: number;
  top?: number;
  duration?: number;
  scrollFunc?: (top: number, left: number) => void;
  easeFunc?: SmoothScrollEaseFunc;
}

export function smoothScroll(options: SmoothScrollOptions): Promise<void> {
  const defaultOptions: SmoothScrollOptions = {
    easeFunc: easeInOutQuad,
    duration: 800
  };
  options = {...defaultOptions, ...options};

  return new Promise(resolve => {
    let currentTime = 0;
    const increment = 20;
    let valX = options.offsetLeft;
    let valY = options.offsetTop;

    const animateScroll = () => {
      // increment the time
      currentTime += increment;
      // find the value with the easing function
      if (typeof options.left !== 'undefined') {
        const deltaX = options.left - options.offsetLeft;
        valX = options.easeFunc(currentTime, options.offsetLeft, deltaX, options.duration);
      }
      if (typeof options.top !== 'undefined') {
        const deltaY = options.top - options.offsetTop;
        valY = options.easeFunc(currentTime, options.offsetTop, deltaY, options.duration);
      }
      // scroll to position
      options.scrollFunc(valX, valY);
      // do the animation unless its over
      if (currentTime < options.duration) {
        animationFrameScheduler.schedule(animateScroll);
      } else {
        resolve();
      }
    };
    animateScroll();
  });
}

// easing functions http://goo.gl/5HLl8
export function easeInOutQuad(t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}
