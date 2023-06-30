import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementContactComponent } from './management-contact.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementContactRoutingModule {}
