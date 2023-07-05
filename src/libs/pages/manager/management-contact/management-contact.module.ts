import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementContactComponent } from './management-contact.component';
import { ManagementContactRoutingModule } from './management-contact.routing.module';
import { LoadingModule } from '@core/component/loading';
import { MenuModule, SearchModule, SelectModule } from '@core/ui';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ManagementContactRoutingModule,
    LoadingModule,
    SearchModule,
    MenuModule,
    SvgIconsModule,
    SelectModule,
    ReactiveFormsModule,
  ],
  declarations: [ManagementContactComponent],
})
export class ManagementContactModule {}
