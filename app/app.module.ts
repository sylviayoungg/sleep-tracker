import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OvernightPage } from './pages/overnight/overnight.page';
import { HomePage } from './home/home.page';
import { SleepinessPage } from './pages/sleepiness/sleepiness.page';

@NgModule({
  declarations: [AppComponent],
  imports: [ BrowserModule, RouterModule.forRoot([]), IonicModule.forRoot(), AppRoutingModule],
  providers: [SleepinessPage, HomePage, OvernightPage, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
