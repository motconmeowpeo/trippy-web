import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementInvoiceComponent } from './management-invoice.component';
import { ManagementInvoiceRoutingModule } from './management-invoice.routing.module';
import { LoadingModule } from '@core/component/loading';
import { MenuModule, SearchModule } from '@core/ui';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ManagementInvoiceRoutingModule,
    LoadingModule,
    SearchModule,
    MenuModule,
    SvgIconsModule,
    FontAwesomeModule,
  ],
  declarations: [ManagementInvoiceComponent],
})
export class ManagementInvoiceModule {}
