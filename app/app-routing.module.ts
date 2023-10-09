import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'overnight',
    loadChildren: () => import('./pages/overnight/overnight.module').then( m => m.OvernightPageModule)
  },
  {
    path: 'overnight-full-log',
    loadChildren: () => import('./pages/overnight-full-log/overnight-full-log.module').then( m => m.OvernightFullLogPageModule)
  },
  {
    path: 'sleepiness',
    loadChildren: () => import('./pages/sleepiness/sleepiness.module').then( m => m.SleepinessPageModule)
  },
  {
    path: 'sleepiness-full-log',
    loadChildren: () => import('./pages/sleepiness-full-log/sleepiness-full-log.module').then( m => m.SleepinessFullLogPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
