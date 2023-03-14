import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourItemComponent } from './tourItem.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [TourItemComponent],
  exports: [TourItemComponent]
})
export class TourItemModule { }
