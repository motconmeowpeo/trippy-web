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
import { FormsModule } from '@angular/forms';
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
    NzFormModule,
    NzInputModule,
    BannerModule,
    BannerBotModule,
    FontAwesomeModule,
    FormsModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
