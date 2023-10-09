import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvernightFullLogPageRoutingModule } from './overnight-full-log-routing.module';

import { OvernightFullLogPage } from './overnight-full-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OvernightFullLogPageRoutingModule
  ],
  declarations: [OvernightFullLogPage]
})
export class OvernightFullLogPageModule {}
