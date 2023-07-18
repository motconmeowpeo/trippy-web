import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyContactComponent } from './my-contact.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MyContactComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [MyContactComponent],
})
export class MyContactModule {}
