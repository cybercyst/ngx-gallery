import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'carousel-nav-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="carousel-nav-button-wrapper"
         [style.marginLeft.px]="space"
         [style.marginRight.px]="space">
      <ng-container *ngIf="customTemplate; else defaultTemplate">
        <ng-container *ngTemplateOutlet="customTemplate"></ng-container>
      </ng-container>
      <ng-template #defaultTemplate>
        <button class="carousel-nav-button"
                (tapClick)="select.emit()"
                [disabled]="disabled">
          <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
        </button>
      </ng-template>
    </div>
  `
})
export class CarouselNavButton {
  @Input() space: number;
  @Input() disabled: boolean;
  @Input() iconTemplate: TemplateRef<any>;
  @Input() customTemplate: TemplateRef<any>;

  /** Stream that emits when nav button is clicked */
  @Output() select = new EventEmitter();
}
