import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerTopComponent } from './bannerTop.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BannerTopComponent],
  exports: [BannerTopComponent]
})
export class BannerTopModule { }
