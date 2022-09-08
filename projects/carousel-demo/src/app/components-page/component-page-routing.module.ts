import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsPageComponent } from './components-page/components-page.component';
import { ComponentViewerComponent } from './component-viewer/component-viewer.component';
import { ComponentOverviewComponent } from './component-overview/component-overview.component';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';
import { ComponentResolver } from './resolver/component.resolver';
import { ComponentListComponent } from "./component-list/component-list.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full',
      },
      {
        path: 'category',
        component: ComponentListComponent
      },
      {
        path: ':name',
        component: ComponentsPageComponent,
        children: [
          {
            path: '',
            component: ComponentViewerComponent,
            children: [
              // {
              //   path: '',
              //   redirectTo: 'carousel',
              //   pathMatch: 'full',
              // },
              {
                path: '',
                children: [
                  {
                    path: '',
                    redirectTo: 'overview',
                    pathMatch: 'full',
                  },
                  {
                    path: 'overview',
                    component: ComponentOverviewComponent
                  },
                  {
                    path: 'api',
                    component: ComponentOverviewComponent
                  },
                  {
                    path: 'examples',
                    component: ComponentExamplesComponent
                  }
                ],
                resolve: {
                  data: ComponentResolver
                }
              }
            ]
          }
        ]
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentPageRoutingModule {
}
