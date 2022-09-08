import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: HomeComponent
            }
        ]),
        ReactiveFormsModule
    ]

})
export class HomeModule {
}
