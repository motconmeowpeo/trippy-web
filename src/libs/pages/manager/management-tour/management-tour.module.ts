import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementTourComponent } from './management-tour.component';
import { ManagementTourRoutingModule } from './management-tour.module.routing';
import { ButtonModule, PaginationModule, SearchModule } from '@core/ui';
import { TourItemModule } from '@core/component/tourItem';
import { LoadingModule } from '@core/component/loading';

@NgModule({
  imports: [
    CommonModule,
    ManagementTourRoutingModule,
    SearchModule,
    TourItemModule,
    LoadingModule,
    ButtonModule,
    PaginationModule,
  ],
  declarations: [ManagementTourComponent],
})
export class ManagementTourModule {}
