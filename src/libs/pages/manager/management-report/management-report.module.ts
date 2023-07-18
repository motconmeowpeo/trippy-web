import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementReportComponent } from './management-report.component';
import { ManagementReportRoutingModule } from './management-report.module.routing';

@NgModule({
  imports: [CommonModule, ManagementReportRoutingModule],
  declarations: [ManagementReportComponent],
})
export class ManagementReportModule {}
