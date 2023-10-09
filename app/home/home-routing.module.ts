import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  
  {
    path: 'overnight',
    loadChildren: () => import('src/app/pages/overnight/overnight.module').then( m => m.OvernightPageModule)
  },

  {
    path: 'overnight-full-log',
    loadChildren: () => import('src/app/pages/overnight-full-log/overnight-full-log.module').then( m => m.OvernightFullLogPageModule)
  },

  {
    path:'sleepiness',
    loadChildren: () => import('src/app/pages/sleepiness/sleepiness.module').then(m => m.SleepinessPageModule)
  },

  {
    path:'sleepiness-full-log',
    loadChildren: () => import('src/app/pages/sleepiness-full-log/sleepiness-full-log.module').then(m => m.SleepinessFullLogPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
