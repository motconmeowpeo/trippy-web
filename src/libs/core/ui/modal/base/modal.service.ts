/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, TemplateRef, Type } from '@angular/core';
import { DialogService, DialogConfig, DialogRef } from '@ngneat/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: DialogService) {}

  open(component: TemplateRef<any>, config?: Partial<DialogConfig>): DialogRef {
    return this.dialog.open(component, { ...config, enableClose: false });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
