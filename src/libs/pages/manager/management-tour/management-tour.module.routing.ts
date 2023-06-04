import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementTourComponent } from './management-tour.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementTourComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementTourRoutingModule {}
