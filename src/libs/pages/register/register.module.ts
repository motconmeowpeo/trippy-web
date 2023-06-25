import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { BannerModule } from '@core/component/banner';
import { Routes, RouterModule } from '@angular/router';
import { BannerBotModule } from '@core/component/bannerBot';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from '@core/component/loading';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ToastNotificationService } from '@core/services';
import { LoadingSmallModule } from '@core/component/loading-small';
import { FooterModule } from '@core/component/footer';
const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NzButtonModule,
    NzInputModule,
    BannerModule,
    BannerBotModule,
    LoadingModule,
    FontAwesomeModule,
    LoadingSmallModule,

    ReactiveFormsModule,
    FooterModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
