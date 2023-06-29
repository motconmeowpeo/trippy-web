import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Ticket } from '@core/enum';
import { ILocation } from '@core/model';

export interface ITicketTour {
  age: Ticket;
  price: number;
}
export interface ITourPlan {
  day: number;
  description: string;
}
export interface ICreateTourForm {
  name: FormControl<string>;
  description: FormControl<string>;
  maxPeople: FormControl<number>;
  totalDays: FormControl<number>;
  minAge: FormControl<number>;
  tourPlan: FormControl<ITourPlan[]>;
  tickets: FormControl<ITicketTour[]>;
  overview: FormControl<File[]>;
  preview: FormControl<File[]>;
  locationId: FormControl<string>;
}


