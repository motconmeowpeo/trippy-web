import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { BannerModule } from '@core/component/banner';
import { BannerBotModule } from '../../core/component/bannerBot/bannerBot.module';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), BannerModule,BannerBotModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
