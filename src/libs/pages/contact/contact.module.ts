import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule, Routes } from '@angular/router';
import { BannerModule } from '@core/component/banner';
import { FooterModule } from '@core/component/footer';
import { BannerBotModule } from '@core/component/bannerBot';
import { ButtonModule } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BannerModule,
    FooterModule,
    BannerBotModule,
    ButtonModule,
    FontAwesomeModule,
  ],
  declarations: [ContactComponent],
})
export class ContactModule {}
