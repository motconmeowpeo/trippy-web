import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourItemComponent } from './tourItem.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  declarations: [TourItemComponent],
  exports: [TourItemComponent],
})
export class TourItemModule {}
