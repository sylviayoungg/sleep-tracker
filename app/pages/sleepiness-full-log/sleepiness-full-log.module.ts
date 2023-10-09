import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SleepinessFullLogPageRoutingModule } from './sleepiness-full-log-routing.module';

import { SleepinessFullLogPage } from './sleepiness-full-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SleepinessFullLogPageRoutingModule
  ],
  declarations: [SleepinessFullLogPage]
})
export class SleepinessFullLogPageModule {}
