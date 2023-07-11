import { TourStatus } from '../enum/tour.enum';
import {
  ITicketTour,
  ITourPlan,
} from '../ui/modal/create-tour-modal/create-tour-modal.form';
import { ITourComment } from './tour-comment';

export interface ITour {
  id: string;
  name: string;
  status: TourStatus;
  description: string;
  location: TourLocation;
  preview: string;
  overview: string[];
  maxPeople: number;
  minPeople: number;
  totalDays: number;
  minAge: number;
  createBy: string;
  tickets: ITicketTour[];
  tourPlan: ITourPlan[];
  commentsTour: ITourComment[];
}

export interface ITourCommand {
  name?: string;
  description?: string;
  locationId?: string;
  preview: string;
  overview: string[];
  maxPeople?: number;
  totalDays?: number;
  minAge?: number;
  createBy?: string;
  tickets?: ITicketTour[];
  tourPlan?: ITourPlan[];
}

export interface TourLocation {
  id: string;
  name: string;
  iso2: string;
}
