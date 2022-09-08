import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'doc-viewer',
  template: '<ng-content></ng-content>',
  styles: [':host { background: unset !important }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocViewerComponent {
}
