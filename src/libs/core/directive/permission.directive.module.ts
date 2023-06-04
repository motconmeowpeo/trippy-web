import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from './permission.directive.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PermissionsDirective],
  exports: [PermissionsDirective],
})
export class PermissionsDirectiveModule {}
