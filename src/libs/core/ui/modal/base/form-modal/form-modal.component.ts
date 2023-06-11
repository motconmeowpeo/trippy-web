import { Injectable, Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { first, tap, asyncScheduler } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { ToastNotificationService } from '@core/services';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ConfirmModalComponent } from '../confirm-modal';
import { ModalCloseStatus } from '@core/enum';

@Injectable()
@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
})
export class FormModalComponent<
  IForm extends { [K in keyof IForm]: AbstractControl<any, any> }
> extends ModalComponent {
  notification = inject(ToastNotificationService);
  isOpenConfirmClose = false;
  isFormChanged = false;
  dialog = inject(DialogService);
  readonly ModalCloseStatus = ModalCloseStatus;

  @Input() form!: FormGroup<IForm>;
  @Input() split?: boolean = false;
  @Input() modalFormClass!: string;
  @Input() messageSuccess!: string;

  constructor() {
    super();
  }

  override handleESC() {
    const dialogList = document.getElementsByTagName('ngneat-dialog');

    if (
      !this.isOpenConfirmClose &&
      dialogList.item(dialogList.length - 1)?.id === this.ref.id
    ) {
      this.isOpenConfirmClose = true;
      this.isFormChanged ? this.openModalConfirm() : this.close();
    }
  }

  override handleClick(target: Element) {
    if (
      typeof target.className === 'string' &&
      target.className.includes(this.BACKDROP_CLASS) &&
      target.parentElement?.id.includes(this.ref.id) &&
      !this.isOpenConfirmClose
    ) {
      this.isOpenConfirmClose = true;
      this.isFormChanged
        ? this.openModalConfirm()
        : this.checkMultipleDialogs(target);
    }
  }

  submit() {
    this.close({ status: ModalCloseStatus.COMPLETE });
  }

  // errorMessage(controlName: keyof IForm, subControlName?: string): string {
  //   const error = getError(this.form.hasError(controlName));

  //   return (
  //     !!error &&
  //     this.translate.instant(error.key, {
  //       value: this.translate.instant(
  //         (subControlName || controlName).toString()
  //       ),
  //       ...error?.data,
  //     })
  //   );
  // }

  private openModalConfirm() {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          title: 'exitModalNotification',
          description: 'confirmExitModal',
          textSubmit: 'yes',
          textCancel: 'no',
        },
        width: 460,
      })
      .afterClosed$.pipe(first())
      .subscribe((result: any) => {
        if (result?.status === ModalCloseStatus.COMPLETE) {
          this.close();
        } else {
          asyncScheduler.schedule(() => {
            this.isOpenConfirmClose = false;
          });
        }
      });
  }
}
