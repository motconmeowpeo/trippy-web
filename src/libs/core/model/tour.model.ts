export interface ITour {
  id: string;
  name: string;
  description: string;
  location: TourLocation;
  preview: string;
  overview: string;
  maxPeople: string;
  totalDays: string;
  minAge: string;
  createBy: string;
}

export interface TourLocation {
  name: string;
  iso2: string;
}
