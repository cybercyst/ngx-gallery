import {
  Directive,
  Input,
  Output,
  EventEmitter,
  Optional,
  Inject,
  TemplateRef,
  ComponentRef
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LightboxConfig, LIGHTBOX_CONFIG } from './lightbox.model';
import { LightboxComponent } from './lightbox.component';

@Directive({
  selector: 'ng-template[lightbox]',
  exportAs: 'lightbox'
})
export class LightboxDirective {

  private config: LightboxConfig = {
    role: 'lightbox',
    panelClass: 'g-overlay',
    backdropClass: 'g-backdrop',
    hasBackdrop: true,
    keyboardShortcuts: true,
    disposeOnNavigation: true,
    startAnimationTime: 150,
    exitAnimationTime: 75
  };

  /** Overlay ref to close the lightbox */
  private overlayRef: OverlayRef;

  @Input() selected: number;

  /** The ARIA role of the lightbox element. */
  @Input() role: string;

  /** Aria label to assign to the lightbox element */
  @Input() ariaLabel: string;

  /** ID of the element that should be considered as the lightbox's label. */
  @Input() ariaLabelledBy: string;

  /** ID of the element that describes the lightbox. */
  @Input() ariaDescribedBy: string;

  /** Make fullscreen */
  @Input() fullscreen: boolean;

  /** The lightbox start animation time in ms */
  @Input() startAnimationTime: number = this.config.startAnimationTime;

  /** The lightbox exit animation time in ms */
  @Input() exitAnimationTime: number = this.config.exitAnimationTime;

  @Input() backdropClass: string = this.config.backdropClass;
  @Input() panelClass: string = this.config.panelClass;
  @Input() hasBackdrop: boolean = this.config.hasBackdrop;
  @Input() positionStrategy: PositionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
  @Input() scrollStrategy: ScrollStrategy;
  @Input() disposeOnNavigation: boolean = this.config.disposeOnNavigation;

  @Output() opened = new EventEmitter<void>();

  @Output() closed = new EventEmitter<void>();

  constructor(@Optional() @Inject(LIGHTBOX_CONFIG) config: LightboxConfig,
              private overlay: Overlay,
              private template: TemplateRef<any>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Open Lightbox Overlay
   */
  open(i: number = 0, config?: LightboxConfig) {
    this.selected = i;

    const newConfig = config ? { ...this.config, ...config } : this.config;

    const overlayConfig: OverlayConfig = {
      backdropClass: this.backdropClass,
      panelClass: this.panelClass,
      hasBackdrop: this.hasBackdrop,
      disposeOnNavigation: this.disposeOnNavigation,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    };

    this.overlayRef = this.overlay.create(overlayConfig);

    // overlay opened event
    this.overlayRef.attachments().subscribe(() => this.opened.next());

    // overlay closed event
    this.overlayRef.detachments().subscribe(() => this.closed.next());

    // Attach gallery to the overlay
    const componentPortal = new ComponentPortal(LightboxComponent);
    const lightboxRef: ComponentRef<LightboxComponent> = this.overlayRef.attach(componentPortal);
    lightboxRef.instance.overlayRef = this.overlayRef;
    lightboxRef.instance.role = this.role;
    lightboxRef.instance.fullscreen = this.fullscreen;
    lightboxRef.instance.contentTemplate = this.template;
    lightboxRef.instance.ariaLabel = this.ariaLabel;
    lightboxRef.instance.ariaLabelledBy = this.ariaLabelledBy;
    lightboxRef.instance.ariaDescribedBy = this.ariaDescribedBy;

    if (newConfig.hasBackdrop) {
      this.overlayRef.backdropClick().subscribe(() => this.close());
    }
  }

  /**
   * Close Lightbox Overlay
   */
  close() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
