import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvernightFullLogPage } from './overnight-full-log.page';

const routes: Routes = [
  {
    path: '',
    component: OvernightFullLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvernightFullLogPageRoutingModule {}
