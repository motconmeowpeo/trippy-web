import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationDetailComponent } from './destinationDetail.component';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule } from '@core/component/loading';
import { BannerModule } from '@core/component/banner';
import { BannerBotModule } from '@core/component/bannerBot';
import { TourItemModule } from '@core/component/tourItem';
import { URL_TOURDETAIL } from '@core/constants';

const routes: Routes = [
  {
    path: '',
    component: DestinationDetailComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoadingModule,
    BannerModule,
    BannerBotModule,
    TourItemModule,
  ],
  declarations: [DestinationDetailComponent],
})
export class DestinationDetailModule {}
