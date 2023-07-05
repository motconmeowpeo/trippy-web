import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Custom Modal
import { InformationModalComponent } from './information-modal';
import { FormModalComponent } from './form-modal';
import { FormInformationModalComponent } from './form-information-modal';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ButtonModule,
  InputModule,
  SearchModule,
  SelectModule,
  InputFileModule,
  UploadFileModule,
  ChipModule,
  MenuModule,
} from '@core/ui';
import { LoadingModule } from '@core/component/loading';
import { LoadingSmallModule } from '@core/component/loading-small';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ConfirmModalComponent } from './confirm-modal';
import { TestModal } from '../test';
import { CreateTourModalComponent } from '../create-tour-modal';
import { UpdateTourModalComponent } from '../update-tour-modal';
import { InvoiceDetailModalComponent } from '../invoice-detail-modal';
const MODALS = [
  FormInformationModalComponent,
  FormModalComponent,
  InformationModalComponent,
  ConfirmModalComponent,
  TestModal,
  CreateTourModalComponent,
  UpdateTourModalComponent,
  InvoiceDetailModalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SvgIconsModule,
    FontAwesomeModule,

    // UI
    ButtonModule,
    InputModule,
    SelectModule,
    LoadingModule,
    LoadingSmallModule,
    SearchModule,
    NzToolTipModule,
    NzButtonModule,
    UploadFileModule,
    InputFileModule,
    ChipModule,
    MenuModule,
    UploadFileModule,
    InputFileModule,
    ChipModule,
    MenuModule,
  ],
  declarations: [ModalComponent, ...MODALS],
  exports: [ModalComponent],
})
export class ModalModule {}
