
import { NgModule } from '@angular/core';

import { URL_HOME, URL_TOUR, URL_TOURDETAIL, URL_DESCRIPTION } from '@core/constants';
import { Routes, RouterModule } from '@angular/router';

const publicRoute = [
  {
    path: URL_HOME,
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule)
  },
  {
    path: URL_TOUR,
    loadChildren: () => import('@pages/tour').then((page) => page.TourModule)
  },
  {
    path: URL_TOURDETAIL,
    loadChildren: () => import('@pages/tourDetail').then((page) => page.TourDetailModule)
  },
  {
    path: URL_DESCRIPTION,
    loadChildren: () => import('@pages/destination').then((page) => page.DescriptionModule)
  }
]
const privateRoute = [
  {
    path: URL_HOME,
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule)
  },
]
const routes: Routes = [
  ...publicRoute, ...privateRoute
];

@NgModule({
  imports: [RouterModule.forRoot(publicRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
