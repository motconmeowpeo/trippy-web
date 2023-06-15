import { Component, OnInit } from '@angular/core';

import { FormModalComponent } from '../base/form-modal';
import { FILE_FORMAT, FILE_SIZE } from '@core/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITestForm } from './test.component.form';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test.component.html',
})
export class TestModal extends FormModalComponent<any> implements OnInit {
  readonly FILE_SIZE = FILE_SIZE;
  readonly FILE_FORMAT = FILE_FORMAT;
  override form!: FormGroup<ITestForm>;
  constructor() {
    super();
  }

  ngOnInit() {
    const file: File[] = [];
    this.form = new FormGroup({
      preview: new FormControl(file, { nonNullable: true }),
    });
  }
}
