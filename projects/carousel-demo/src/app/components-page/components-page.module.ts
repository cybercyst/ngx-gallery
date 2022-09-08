import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';

import { SharedModule } from '../shared/shared.module';
import { ComponentsExamplesModule } from '../components-examples';
import { ComponentPageRoutingModule } from './component-page-routing.module';

import { ComponentNavComponent } from './component-nav/component-nav.component';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { ComponentViewerComponent } from './component-viewer/component-viewer.component';
import { ComponentOverviewComponent } from './component-overview/component-overview.component';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { ComponentListComponent } from './component-list/component-list.component';

@NgModule({
  declarations: [
    ComponentsPageComponent,
    ComponentNavComponent,
    ComponentViewerComponent,
    ComponentOverviewComponent,
    ComponentExamplesComponent,
    ComponentListComponent
  ],
  imports: [
    ComponentsExamplesModule,
    PortalModule,
    ComponentPageRoutingModule,
    SharedModule
  ],
  exports: [
    ComponentListComponent
  ]
})
export class ComponentsPageModule {
}
