import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerTopComponent } from './bannerTop.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [BannerTopComponent],
  exports: [BannerTopComponent]
})
export class BannerTopModule { }
