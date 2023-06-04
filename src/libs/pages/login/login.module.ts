import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { BannerModule } from '@core/component/banner';
import { BannerBotModule } from '../../core/component/bannerBot/bannerBot.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@core/component/loading';
import { JwtModule } from '@auth0/angular-jwt';
import { LoadingSmallModule } from '@core/component/loading-small';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    BannerBotModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LoadingModule,
    LoadingSmallModule,
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
