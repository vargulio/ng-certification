import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForecastComponent } from './forecast.component';

const routes: Routes = [{ path: ':zipcode', component: ForecastComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastRoutingModule { }
