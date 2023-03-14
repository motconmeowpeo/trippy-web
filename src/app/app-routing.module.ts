import { NgModule } from '@angular/core';

import {
  URL_HOME,
  URL_TOUR,
  URL_TOURDETAIL,
  URL_DESTINATION,
  URL_DESTINATIONDETAIL,
} from '@core/constants';
import { Routes, RouterModule } from '@angular/router';

const publicRoute = [
  {
    path: URL_HOME,
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule),
  },
  {
    path: URL_TOUR,
    loadChildren: () => import('@pages/tour').then((page) => page.TourModule),
  },
  {
    path: URL_TOURDETAIL,
    loadChildren: () =>
      import('@pages/tourDetail').then((page) => page.TourDetailModule),
  },
  {
    path: URL_DESTINATION,
    loadChildren: () =>
      import('@pages/destination').then((page) => page.DestinationModule),
  },
  {
    path: URL_DESTINATIONDETAIL,
    loadChildren: () =>
      import('@pages/destinationDetail').then(
        (page) => page.DestinationDetailModule
      ),
  },
];
const privateRoute = [
  {
    path: URL_HOME,
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule),
  },
];
const routes: Routes = [...publicRoute, ...privateRoute];

@NgModule({
  imports: [RouterModule.forRoot(publicRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
