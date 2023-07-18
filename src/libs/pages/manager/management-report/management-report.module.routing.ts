import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementReportComponent } from './management-report.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementReportRoutingModule {}
