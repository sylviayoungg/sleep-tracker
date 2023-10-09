import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepinessPage } from './sleepiness.page';

const routes: Routes = [
  {
    path: '',
    component: SleepinessPage
  },

  {
    path:'sleepiness-full-log',
    loadChildren: () => import('src/app/pages/sleepiness-full-log/sleepiness-full-log.module').then(m => m.SleepinessFullLogPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepinessPageRoutingModule {}
