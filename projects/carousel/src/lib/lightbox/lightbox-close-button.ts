import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[lightboxCloseButton]'
})
export class LightboxCloseButton {

  constructor(public template: TemplateRef<any>) {
  }

}
