import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationModalComponent } from '../information-modal';
import { ModalCloseStatus } from '@core/enum';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent
  extends InformationModalComponent
  implements OnInit
{
  readonly ModalCloseStatus = ModalCloseStatus;

   
  
  get description(): string {
    return this.data?.description;
  }
  get reason(): boolean {
    return this.data?.reason;
  }

  get textSubmit(): string {
    return this.data?.textSubmit;
  }

  get textCancel(): string {
    return this.data?.textCancel || 'cancel';
  }

  get url(): string {
    return this.data?.navigateUrl;
  }

  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.type = this.data?.type || this.type;
  }

  submit() {
    this.url && this.router.navigateByUrl(this.url);
    this.close({ status: ModalCloseStatus.COMPLETE });
  }
}
