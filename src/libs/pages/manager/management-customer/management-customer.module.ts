import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementCustomerComponent } from './management-customer.component';
import { ManagementCustomerRoutingModule } from './management-customer.routing.module';
import {
  ButtonModule,
  PaginationModule,
  SearchModule,
  SelectModule,
} from '@core/ui';
import { TourItemModule } from '@core/component/tourItem';
import { LoadingModule } from '@core/component/loading';
import { ReactiveFormsModule } from '@angular/forms';
import { UserItemModule } from '@core/component/user-item';

@NgModule({
  imports: [
    CommonModule,
    SearchModule,
    TourItemModule,
    LoadingModule,
    ButtonModule,
    PaginationModule,
    ReactiveFormsModule,
    UserItemModule,
    SelectModule,

    ManagementCustomerRoutingModule,
  ],
  declarations: [ManagementCustomerComponent],
})
export class ManagementCustomerModule {}
