import { Component, OnInit } from '@angular/core';
import {
  AuthFacade,
  LocationFacade,
  ToastNotificationService,
  TourFacade,
} from '@core/services';
import { ISelectItem, ITour, ITourCommand } from '@core/model';
import { of, switchMap, tap, delay, catchError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  faCirclePlus,
  faCircleMinus,
  faCircleExclamation,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FormModalComponent } from '../base/form-modal';
import {
  ICreateTourForm,
  ITourPlan,
  ITicketTour,
} from './create-tour-modal.form';
import { Ticket } from '@core/enum';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { head } from 'lodash';

@Component({
  selector: 'app-create-tour-modal',
  templateUrl: './create-tour-modal.component.html',
})
export class CreateTourModalComponent
  extends FormModalComponent<any>
  implements OnInit
{
  faNote = faCircleExclamation;
  faPlus = faCirclePlus;
  faMinus = faCircleMinus;
  faLocationDot = faLocationDot;
  Ticket = Ticket;
  formCreate!: FormGroup<ICreateTourForm>;
  tourPlan: ITourPlan[] = [];
  planDay = 0;
  selectCountry: ISelectItem[] = [];
  user$ = this.authFacade.user$;
  constructor(
    private locationfacade: LocationFacade,
    private tourFacade: TourFacade,
    private authFacade: AuthFacade,
    private storage: Storage,
    private notifiService: ToastNotificationService
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
              value: location.id,
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
    const preview: File[] = [];
    const tickets: ITicketTour[] = [
      { age: Ticket.ADULT, price: 0 },
      { age: Ticket.YOUNG, price: 0 },
      { age: Ticket.CHILDREN, price: 0 },
    ];
    const tourPlan: ITourPlan[] = [];

    this.formCreate = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      description: new FormControl('', {
        nonNullable: true,
        updateOn: 'change',
      }),
      maxPeople: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      minAge: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      totalDays: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      tourPlan: new FormControl(tourPlan, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      tickets: new FormControl(tickets, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      overview: new FormControl(file, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      preview: new FormControl(preview, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(1)],
      }),
      locationId: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  removePlan(index: number) {
    this.tourPlan.splice(index, 1);
  }

  changePrice(ticketType: Ticket, price: string) {
    switch (ticketType) {
      case Ticket.CHILDREN:
        const ticketChildren = this.formCreate.value.tickets?.map((ticket) => {
          if (ticket.age === Ticket.CHILDREN)
            return {
              ...ticket,
              price: +price,
            };
          return ticket;
        });
        if (ticketChildren)
          this.formCreate.controls['tickets'].setValue(ticketChildren);

        break;
      case Ticket.YOUNG:
        const ticketYoung = this.formCreate.value.tickets?.map((ticket) => {
          if (ticket.age === Ticket.YOUNG)
            return {
              ...ticket,
              price: +price,
            };
          return ticket;
        });
        if (ticketYoung)
          this.formCreate.controls['tickets'].setValue(ticketYoung);
        break;
      case Ticket.ADULT:
        const ticketAdult = this.formCreate.value.tickets?.map((ticket) => {
          if (ticket.age === Ticket.ADULT)
            return {
              ...ticket,
              price: +price,
            };
          return ticket;
        });

        if (ticketAdult)
          this.formCreate.controls['tickets'].setValue(ticketAdult);
        break;
    }
  }

  addPlan() {
    this.tourPlan.push({ day: 0, description: '' });
    this.planDay = this.planDay + 1;
  }

  onAddTourPlan(index: number, planValue: string) {
    this.tourPlan[index].description = planValue;
    this.tourPlan[index].day = index + 1;
    this.planDay = index;
    this.formCreate.controls['tourPlan'].setValue(this.tourPlan);
  }

  createTour() {
    this.isCreating = true;
    this.user$
      .pipe(
        switchMap((user) => {
          if (this.formCreate.value.overview && this.formCreate.value.preview) {
            this.upLoadOverview(this.formCreate.value.overview);
            this.uploadPreview(this.formCreate.value.preview);
          }
          return of(user);
        }),
        tap((user) => {
          const payload: ITourCommand = {
            ...this.formCreate.value,
            overview: this.formCreate.value.overview?.map(
              (image) => image.name
            ),
            preview: head(this.formCreate.value.preview)?.name,
            createBy: user?.id || '',
          };
          this.onCreateTour(payload);
        })
      )
      .subscribe();
  }

  private onCreateTour(payload: ITourCommand) {
    this.tourFacade
      .create(payload)
      .pipe(
        tap(() => {
          this.notifiService.success('Success', 'Created tour');
          this.close();
          this.isCreating = false;
        }),
        catchError((err) => {
          this.isCreating = false;
          return of(err);
        })
      )
      .subscribe();
  }

  private upLoadOverview(files: File[]) {
    // Array.from(this.file).map((file) => console.log(file));
    Array.from(files).map((file) => {
      const storageRef = ref(this.storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => console.log(error)
      );
    });
  }
  private uploadPreview(files: File[]) {
    // Array.from(this.file).map((file) => console.log(file));
    Array.from(files).map((file) => {
      const storageRef = ref(this.storage, `${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => console.log(error)
      );
    });
  }
}
