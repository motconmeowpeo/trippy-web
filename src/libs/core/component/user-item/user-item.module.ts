import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { IconsModule, MenuModule } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    SvgIconsModule,
    IconsModule,
    MenuModule,
    FontAwesomeModule,
  ],
  declarations: [UserItemComponent],
  exports: [UserItemComponent],
})
export class UserItemModule {}
