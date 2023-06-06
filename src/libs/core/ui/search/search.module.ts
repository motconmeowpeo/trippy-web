import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IconsModule } from '@core/ui';

@NgModule({
  imports: [CommonModule, IconsModule, NzToolTipModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {}
