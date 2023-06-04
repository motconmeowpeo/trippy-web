import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSmallComponent } from './loading-small.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingSmallComponent],
  exports: [LoadingSmallComponent],
})
export class LoadingSmallModule {}
