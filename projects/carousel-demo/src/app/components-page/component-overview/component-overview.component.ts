import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';
import { DocSegment, DocContentType } from '../components.data';

@Component({
  selector: 'component-overview',
  templateUrl: './component-overview.component.html',
  styleUrls: ['./component-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentOverviewComponent implements OnInit {

  doc$: Observable<DocSegment[]>;
  DocType = DocContentType;

  constructor(public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.doc$ = this.activatedRoute.data.pipe(
      map((data: Data) => {
        return data.data.docs;
      })
    );
  }
}
