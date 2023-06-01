import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, Subscription, tap, filter, map } from 'rxjs';

@Component({
  selector: 'components-examples-page',
  templateUrl: './components-page.component.html',
  styleUrls: ['./components-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPageComponent implements OnInit, OnDestroy {

  title$: Observable<string>;
  sideNavOpened: boolean;

  private routerEventsSub$: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.title$ = this.activatedRoute.firstChild.firstChild.data.pipe(
      map((data: Data) => data.data.title)
    );

    this.routerEventsSub$ = this.router.events.pipe(
      filter((routerEvent) => routerEvent instanceof NavigationEnd),
      tap(() => this.sideNavOpened = false)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.routerEventsSub$.unsubscribe();
  }
}
