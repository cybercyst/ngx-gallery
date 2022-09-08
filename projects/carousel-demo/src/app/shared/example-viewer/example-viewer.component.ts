import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ComponentExampleData } from '../../components-page/components.data';

@Component({
  selector: 'example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleViewerComponent implements OnInit {

  viewCode: boolean;

  @Input() data: ComponentExampleData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
