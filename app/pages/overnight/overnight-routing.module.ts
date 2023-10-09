import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvernightPage } from './overnight.page';

const routes: Routes = [
  {
    path: '',
    component: OvernightPage
  },

  {
    path: 'overnight-full-log',
    loadChildren: () => import('src/app/pages/overnight-full-log/overnight-full-log.module').then( m => m.OvernightFullLogPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvernightPageRoutingModule {}
