import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourDetailComponent } from './tourDetail.component';
import { Routes, RouterModule } from '@angular/router';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingModule } from '@core/component/rating';
import { LoadingModule } from '@core/component/loading';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSmallModule } from '@core/component/loading-small';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { PermissionsDirectiveModule } from '@core/directive';
import { InputModule } from '@core/ui';
import { FooterModule } from '@core/component/footer';
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
    SvgIconsModule,
    PermissionsDirectiveModule,
    NzCollapseModule,
    InputModule,
    FooterModule,
  ],
  declarations: [TourDetailComponent],
})
export class TourDetailModule {}
