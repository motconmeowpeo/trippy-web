import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { RouterModule, Routes } from '@angular/router';
import { BannerBotModule } from '@core/component/bannerBot';
import { BannerTopModule } from '@core/component/bannerTop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsModule } from '@core/ui';
import { HeaderModule } from '@core/component/header';
import { FooterModule } from '@core/component/footer';
const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BannerBotModule,
    BannerTopModule,
    FontAwesomeModule,
    HeaderModule,
    FooterModule,
  ],
  declarations: [PageComponent],
})
export class PageModule {}
