import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourDetailComponent } from './tourDetail.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
  path: '',
  component: TourDetailComponent
}]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [TourDetailComponent]
})
export class TourDetailModule { }
