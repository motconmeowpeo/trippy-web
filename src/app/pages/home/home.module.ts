import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { BannerTopModule } from '@core/component/bannerTop';
import { BannerBotModule } from '@core/component/bannerBot';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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

  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
