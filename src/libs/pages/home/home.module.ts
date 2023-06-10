import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { BannerTopModule } from '@core/component/bannerTop';
import { BannerBotModule } from '@core/component/bannerBot';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { HeaderModule } from '@core/component/header';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BannerBotModule,
    BannerTopModule,
    FontAwesomeModule,
    NzCarouselModule,
    HeaderModule

  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
