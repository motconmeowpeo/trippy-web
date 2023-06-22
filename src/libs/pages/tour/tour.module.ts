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
import { ButtonModule, MenuModule, SearchModule, SelectModule } from '@core/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { LoadingSmallModule } from '@core/component/loading-small';

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
    ReactiveFormsModule,
    FontAwesomeModule,
    NzDropDownModule,
    NzDatePickerModule,
    FormsModule,
    LoadingSmallModule,
    SearchModule,
    ButtonModule,
  ],
  declarations: [TourComponent],
})
export class TourModule {}
