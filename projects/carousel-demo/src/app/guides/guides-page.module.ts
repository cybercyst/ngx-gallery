import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { GuidesComponent } from './guides/guides.component';
import { GuideViewerComponent } from './guide-viewer/guide-viewer.component';
import { guidesRoutes } from './guides-page-routing';

@NgModule({
  declarations: [
    GuidesComponent,
    GuideViewerComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(guidesRoutes)
  ]
})
export class GuidesPageModule {
}
