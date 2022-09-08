import {
  Component,
  Optional,
  Inject,
  Input,
  ContentChild,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { dialogAnimation } from './lightbox.animation';
import { LightboxCloseButton } from './lightbox-close-button';

@Component({
  host: {
    tabindex: '-1',
    'aria-modal': 'true',
    '[attr.role]': 'role',
    '[attr.aria-labelledby]': 'ariaLabel ? null : ariaLabelledBy',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-describedby]': 'ariaDescribedBy || null',
    '[@dialog]': '{ value: state }',
    '(@dialog.done)': 'onAnimationDone($event)'
  },
  selector: 'lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [dialogAnimation],
  styleUrls: ['./lightbox.component.scss'],
  template: `
    <ng-template #defaultCloseButtonTemplate>
      <svg viewBox="0 0 47.971 47.971"
           xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
	      <path
          d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
          fill="#fff"/>
        </svg>
    </ng-template>

    <div class="lightbox"
         [class.fullscreen]="fullscreen">
      <div class="lightbox-wrapper">

        <div class="g-btn-close"
             aria-label="Close"
             (click)="close()">
          <ng-template [ngTemplateOutlet]="closeButton?.template || defaultCloseButtonTemplate"></ng-template>
        </div>

        <div class="lightbox-content-wrapper">
          <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
      </div>
    </div>
  `
})
export class LightboxComponent {

  /** State of the lightbox animation. */
  state: 'void' | 'enter' | 'exit' = 'enter';

  /** The ARIA role of the lightbox element. */
  @Input() role: string = 'dialog';

  /** Aria-label to assign to the lightbox element */
  @Input() ariaLabel: string;

  /** ID of the element that should be considered as the lightbox's label. */
  @Input() ariaLabelledBy: string;

  /** ID of the element that describes the lightbox. */
  @Input() ariaDescribedBy: string;

  @Input() fullscreen: boolean;

  /** Overlay ref to close the lightbox */
  @Input() overlayRef: OverlayRef;

  @Input() contentTemplate: TemplateRef<any>;

  @ContentChild(LightboxCloseButton) closeButton: LightboxCloseButton;

  constructor(@Optional() @Inject(DOCUMENT) private document: any) {
  }

  /**
   * Close Lightbox Overlay
   */
  close() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  /** Callback, invoked whenever an animation on the host completes. */
  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'exit') {
      this.overlayRef.dispose();
    }
  }
}
