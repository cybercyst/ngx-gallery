import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DocSegment, DocContentType } from '../components.data';

@Component({
  selector: 'app-component-examples',
  templateUrl: './component-examples.component.html',
  styleUrls: ['./component-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentExamplesComponent implements OnInit {

  examples$: Observable<DocSegment[]>;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.examples$ = this.activatedRoute.data.pipe(
      map((data: Data) => {
        return data.data.docs.filter((segment: DocSegment) => segment.type === DocContentType.Component);
      })
    );
  }
}
