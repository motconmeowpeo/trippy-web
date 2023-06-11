import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourDetailComponent } from './tourDetail.component';
import { Routes, RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from '@core/component/rating';
import { LoadingModule } from '@core/component/loading';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSmallModule } from '@core/component/loading-small';
const routes: Routes = [
  {
    path: '',
    component: TourDetailComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NzCarouselModule,
    FontAwesomeModule,
    NzTabsModule,
    LoadingModule,
    RatingModule,
    ReactiveFormsModule,
    LoadingSmallModule,
  ],
  declarations: [TourDetailComponent],
})
export class TourDetailModule {}
