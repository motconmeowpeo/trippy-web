import { Component, OnInit } from '@angular/core';
import { LocationFacade } from '@core/services';
import { ISelectItem } from '@core/model';
import { tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  faCirclePlus,
  faCircleMinus,
  faCircleExclamation,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FormModalComponent } from '../base/form-modal';

@Component({
  selector: 'app-create-tour-modal',
  templateUrl: './create-tour-modal.component.html',
})
export class CreateTourModalComponent extends FormModalComponent<any> implements OnInit {
  faNote = faCircleExclamation;
  faPlus = faCirclePlus;
  faMinus = faCircleMinus;
  faLocationDot = faLocationDot;

  isLoading = false;

  selectCountry: ISelectItem[] = [];
  constructor(
    private locationfacade: LocationFacade,
  ) {
    super();
  }

  ngOnInit() {
    this.isLoading = true;
    this.locationfacade
      .getAllLocation()
      .pipe(
        tap((locations) => {
          this.selectCountry = locations.map((location) => {
            return {
              name: location.name,
              value: location.iso2,
            };
          });
          this.isLoading = false;
        })
      )
      .subscribe();
    this.createForm();
  }

  private createForm() {
    const file: File[] = []; // Giá trị ban đầu cho form control "preview"
    const fileOverview: File[] = []; // Giá trị ban đầu cho form control "overview"
    this.form = new FormGroup({
      country: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),

      state: new FormControl('', {
        nonNullable: true,
        updateOn: 'change',
      }),
      search: new FormControl('', { nonNullable: true }),
      preview: new FormControl(file, { nonNullable: true }),
      overview: new FormControl(fileOverview, { nonNullable: true }),
    });
  }

}
