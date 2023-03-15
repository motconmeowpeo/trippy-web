import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NzDropDownModule,
    NzDatePickerModule,
    FormsModule,
  ],
  declarations: [SearchbarComponent],
  exports: [SearchbarComponent],
})
export class SearchbarModule {}
