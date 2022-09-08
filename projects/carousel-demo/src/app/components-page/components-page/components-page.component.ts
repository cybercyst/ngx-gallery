import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'components-examples-page',
  templateUrl: './components-page.component.html',
  styleUrls: ['./components-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent implements OnInit {

  title$: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.title$ = this.activatedRoute.firstChild.firstChild.data.pipe(
      map((data: Data) => data.data.title)
    );
  }

}
