declare let Hammer: any;

export abstract class SliderAdapter {
  readonly direction: number;
  readonly offsetKey: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end';
  readonly itemSize: number;

  abstract getDelta(e): number;

  abstract getVelocity(e): number;
}


export class HorizontalSliderAdapter implements SliderAdapter {

  readonly direction = Hammer.DIRECTION_HORIZONTAL;

  readonly offsetKey: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end' = 'start';

  get itemSize(): number {
    return this.el.clientWidth;
  }

  constructor(private el: Element) {
  }

  getDelta(e): number {
    return e.deltaX;
  }

  getVelocity(e): number {
    return e.velocityX;
  }
}

export class VerticalSliderAdapter implements SliderAdapter {

  readonly direction = Hammer.DIRECTION_VERTICAL;

  readonly offsetKey: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end' = 'top';

  get itemSize(): number {
    return this.el.clientHeight;
  }

  constructor(private el: Element) {
  }

  getDelta(e): number {
    return e.deltaY;
  }

  getVelocity(e): number {
    return e.velocityY;
  }
}
