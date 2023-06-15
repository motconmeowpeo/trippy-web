import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip.component';
import { SvgIconsModule } from '@ngneat/svg-icon';


@NgModule({
  imports: [CommonModule, SvgIconsModule],
  declarations: [ChipComponent],
  exports: [ChipComponent],
})
export class ChipModule {}
