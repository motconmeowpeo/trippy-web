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
export interface IUpdateTourForm {
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

// export const formArrayTourPlan = (
//   tourPlans: ITourPlan[]
// ): FormArray<ITourPlan> => {
//   return new FormArray<ITourPlan>(
//     tourPlans.map((tourPlan) => formGroupTaskItem(tourPlan))
//   );
// };

// export const formGroupTaskItem = ({
//   day,
//   description,
// }: ITourPlan): FormGroup<ITourPlan> =>
//   new FormGroup({
//     day: new FormControl(day, { nonNullable: true }),
//     description: new FormControl(description, { nonNullable: true }),
//   });
