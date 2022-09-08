import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentViewerComponent implements OnInit {

  paramName$: Observable<string>;
  data$: Observable<any>;

  links: string[] = [
    'overview',
    'api',
    'examples'
  ];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.paramName$ = this.activatedRoute.firstChild.params.pipe(
      map((params: Params) => params.name)
    );
    this.data$ = this.activatedRoute.firstChild.data.pipe(
      map((data: Data) => {
        return data.data;
      })
    );
  }

}
