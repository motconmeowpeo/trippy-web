import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { IconsModule } from '@core/ui';

@NgModule({
  imports: [CommonModule, SvgIconsModule, IconsModule],
  declarations: [UserItemComponent],
  exports: [UserItemComponent],
})
export class UserItemModule {}
