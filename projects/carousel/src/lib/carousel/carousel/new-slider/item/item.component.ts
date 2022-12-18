import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CarouselPage } from 'ng-gallery/next';

@Component({
  host: {
    class: 'carousel-page',
    '[class.carousel-page-active]': 'activePage',
    '[attr.sliderId]': 'sliderId',
    '[attr.sliderIndex]': 'page.index'
  },
  selector: 'carousel-page',
  template: `
    <div *ngFor="let item of page.items"
         class="carousel-item"
         [class.carousel-item-active]="item.index === activeItem"
         (click)="itemClick.emit(item.index)">
      <ng-container [ngTemplateOutlet]="item.template"></ng-container>
    </div>
  `,
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {

  @Input() sliderId: number;
  @Input() page: CarouselPage;
  @Input() activePage: number;
  @Input() activeItem: number;
  @Output() itemClick = new EventEmitter<number>();

  get element(): HTMLElement {
    return this.el.nativeElement;
  }

  constructor(private el: ElementRef<HTMLElement>) {
  }
}
