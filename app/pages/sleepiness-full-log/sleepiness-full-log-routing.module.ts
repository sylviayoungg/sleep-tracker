import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SleepinessFullLogPage } from './sleepiness-full-log.page';

const routes: Routes = [
  {
    path: '',
    component: SleepinessFullLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SleepinessFullLogPageRoutingModule {}
