import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimingPageRoutingModule } from './timing-routing.module';

import { TimingPage } from './timing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimingPageRoutingModule
  ],
  declarations: [TimingPage]
})
export class TimingPageModule {}
