import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementTourComponent } from './management-tour.component';
import { ManagementTourRoutingModule } from './management-tour.module.routing';

@NgModule({
  imports: [CommonModule, ManagementTourRoutingModule],
  declarations: [ManagementTourComponent],
})
export class ManagementTourModule {}
