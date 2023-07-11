import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInvoiceComponent } from './my-invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadingModule } from '@core/component/loading';
import { MenuModule, SearchModule } from '@core/ui';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: MyInvoiceComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoadingModule,
    SearchModule,
    MenuModule,
    SvgIconsModule,
    FontAwesomeModule,
  ],
  declarations: [MyInvoiceComponent],
})
export class MyInvoiceModule {}
