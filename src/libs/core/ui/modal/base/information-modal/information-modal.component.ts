import { Injectable, Component, inject, Input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { MODAL_STYLE } from './information-modal.constant';
import { ToastNotificationService } from '@core/services';

@Injectable()
@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
})
export class InformationModalComponent extends ModalComponent {
  readonly MODAL_STYLE = MODAL_STYLE;

  @Input() type: 'warning' | 'success' | 'lock' | 'changeLanguage' = 'warning';
  @Input() isUISameFormModal = false;

  notification = inject(ToastNotificationService);

  constructor() {
    super();
  }
}
