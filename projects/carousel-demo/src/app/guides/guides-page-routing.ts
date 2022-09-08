import { Routes } from '@angular/router';
import { GuideResolver } from './resolver/guide.resolver';
import { GuideViewerComponent } from './guide-viewer/guide-viewer.component';
import { GuidesComponent } from './guides/guides.component';

export const guidesRoutes: Routes = [
  {
    path: '',
    component: GuidesComponent,
    pathMatch: 'full',
  },
  {
    path: ':name',
    component: GuideViewerComponent,
    resolve: {
      data: GuideResolver
    }
  }
];
