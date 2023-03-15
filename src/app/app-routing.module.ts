import { NgModule } from '@angular/core';

import {
  URL_HOME,
  URL_TOUR,
  URL_TOURDETAIL,
  URL_DESTINATION,
  URL_DESTINATIONDETAIL,
  URL_LOGIN,
  URL_REGISTER,
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
  {
    path: URL_LOGIN,
    loadChildren: () => import('@pages/login').then((page) => page.LoginModule),
  },
  {
    path: URL_REGISTER,
    loadChildren: () =>
      import('@pages/register').then((page) => page.RegisterModule),
  },
];
const privateRoute = [];
const routes: Routes = [...publicRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
