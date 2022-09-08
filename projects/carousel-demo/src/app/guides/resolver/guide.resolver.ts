import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { MarkedService } from '../../services/marked.service';
import { GuideService } from '../guide.service';
import { GuideData, GuideRoute } from "../guides.model";

@Injectable({
  providedIn: 'root'
})
export class GuideResolver implements Resolve<GuideData> {

  constructor(private marked: MarkedService, private guide: GuideService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GuideData> {
    const routeData: GuideRoute = this.guide.routes[route.paramMap.get('name')];
    if (routeData) {
      return this.marked.getMarkDownHtml(this.guide.markdownDirPath, routeData.path).pipe(
        map((content: string) => {
          return {
            content,
            title: routeData.title
          };
        }),
        catchError(() => throwError(() => ({ title: routeData.title })))
      );
    }
    return of(null);
  }

}
