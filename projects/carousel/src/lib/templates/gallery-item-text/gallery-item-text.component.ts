import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export const enum TEXT_POSITIONS {
  top = 'top',
  middle = 'middle',
  bottom = 'bottom'
}

export type GalleryItemTextPosition = TEXT_POSITIONS.top | TEXT_POSITIONS.middle | TEXT_POSITIONS.bottom;

@Component({
  host: {
    '[attr.position]': 'position'
  },
  selector: 'gallery-item-text, carousel-item-text',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./gallery-item-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryItemTextComponent {
  @Input() position: GalleryItemTextPosition = TEXT_POSITIONS.bottom;
}
