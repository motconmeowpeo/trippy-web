import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourComponent } from './tour.component';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule } from '@core/component/loading';
import { BannerModule } from '@core/component/banner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TourItemModule } from '@core/component/tourItem';
import { SearchbarModule } from '@core/component/searchbar';
import { BannerBotModule } from '@core/component/bannerBot';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { MenuModule, SelectModule } from '@core/ui';

const routes: Routes = [
  {
    path: '',
    component: TourComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoadingModule,
    BannerModule,
    FontAwesomeModule,
    TourItemModule,
    SvgIconsModule,
    SearchbarModule,
    BannerBotModule,
    SelectModule,
    MenuModule,
  ],
  declarations: [TourComponent],
})
export class TourModule {}
