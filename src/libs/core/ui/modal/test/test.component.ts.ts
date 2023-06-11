import { Component, OnInit } from '@angular/core';

import { FormModalComponent } from '../base/form-modal';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test.html',
})
export class TestModal extends FormModalComponent<any> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
