import { Inject, Injectable, Optional } from '@angular/core';
import { GuideConfig, GuideRoute, GUIDES_CONFIG } from './guides.model';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  readonly markdownDirPath: string;

  readonly routes: Record<string, GuideRoute>;

  constructor(@Optional() @Inject(GUIDES_CONFIG) config: GuideConfig) {

    this.markdownDirPath = config.markdownDirPath;

    this.routes = config.routes.reduce((total: Record<string, GuideRoute>, route: GuideRoute) => {
      return {
        ...total,
        [route.path]: route
      };
    }, {});
  }

}
