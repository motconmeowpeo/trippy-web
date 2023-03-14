import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerBotComponent } from './bannerBot.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BannerBotComponent],
  exports: [BannerBotComponent]
})
export class BannerBotModule { }
