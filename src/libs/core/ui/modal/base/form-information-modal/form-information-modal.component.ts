import { Injectable, Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { MODAL_STYLE } from './form-information-modal.constant';
import { ToastNotificationService } from '@core/services';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable()
@Component({
  selector: 'app-form-information-modal',
  templateUrl: './form-information-modal.component.html',
})
export class FormInformationModalComponent<
  IForm extends { [K in keyof IForm]: AbstractControl<any, any> }
> extends ModalComponent {
  readonly MODAL_STYLE = MODAL_STYLE;

  @Input() form!: FormGroup<IForm>;
  @Input() type: 'changeLanguage' | 'changePassword' | 'warning' = 'warning';
  @Input() messageSuccess!: string;

  notification = inject(ToastNotificationService);

  constructor() {
    super();
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.messageSuccess &&
      this.notification.success('success', this.messageSuccess);
  }

  // errorMessage(controlName: keyof IForm): string {
  //   const error =this.form.getError

  //   return (
  //     !!error && error.key,
  //     {
  //       value: controlName.toString(),
  //       ...error?.data,
  //     }
  //   );
  // }
}
