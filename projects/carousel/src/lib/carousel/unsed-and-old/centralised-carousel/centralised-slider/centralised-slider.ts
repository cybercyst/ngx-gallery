import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CAROUSEL_ORIENTATION, CarouselOrientation, CarouselState } from '../../../carousel.model';

@Component({
  selector: 'centralised-slider',
  templateUrl: './centralised-slider.html',
  styleUrls: ['./centralised-slider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CentralisedSlider implements OnChanges {

  @Input() state: CarouselState;
  @Input() itemWidth: number;
  @Input() itemHeight: number;
  @Input() scrollOffset: number;
  @Input() orientation: CarouselOrientation;
  @Input() sensorDisabled: boolean;

  @Output() itemClick = new EventEmitter();

  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewport: CdkVirtualScrollViewport;

  get itemSize(): number {
    return this.orientation === CAROUSEL_ORIENTATION.Horizontal ? this.itemWidth : this.itemHeight;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.scrollOffset?.currentValue !== undefined && changes.scrollOffset.currentValue !== changes.scrollOffset.previousValue) {
      // CDK viewport won't scroll the first time, therefore need to use a set timeout
      // TODO: Check if this works safely in Universal
      requestAnimationFrame(() => {
        this.viewport.scrollToOffset(changes.scrollOffset.currentValue, this.state.behavior);
      });
    }
  }
}
