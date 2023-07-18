import { NgModule } from '@angular/core';

import {
  URL_HOME,
  URL_TOUR,
  URL_TOURDETAIL,
  URL_DESTINATION,
  URL_DESTINATIONDETAIL,
  URL_LOGIN,
  URL_REGISTER,
  URL_MANAGER,
  URL_PAGE,
  URL_CONTACT,
  URL_MYINVOICE,
  URL_MYCONTACT,
} from '@core/constants';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard';
import { ManagerModule } from '../libs/pages/manager/manager.module';
import { MyContactModule } from '../libs/pages/my-contact/my-contact.module';

const publicRoute: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule),
  },
  {
    path: URL_HOME,
    // canActivate: [AuthGuard],
    loadChildren: () => import('@pages/home').then((page) => page.HomeModule),
  },
  {
    path: URL_TOUR,
    // canActivate: [AuthGuard],
    loadChildren: () => import('@pages/tour').then((page) => page.TourModule),
  },
  {
    path: URL_TOURDETAIL,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/tourDetail').then((page) => page.TourDetailModule),
  },
  {
    path: URL_DESTINATION,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/destination').then((page) => page.DestinationModule),
  },
  {
    path: URL_DESTINATIONDETAIL,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/destinationDetail').then(
        (page) => page.DestinationDetailModule
      ),
  },
  {
    path: URL_LOGIN,
    canActivate: [AuthGuard],
    loadChildren: () => import('@pages/login').then((page) => page.LoginModule),
  },
  {
    path: URL_REGISTER,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/register').then((page) => page.RegisterModule),
  },
  {
    path: URL_MANAGER,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/manager').then((page) => page.ManagerModule),
  },
  {
    path: URL_PAGE,
    // canActivate: [AuthGuard],
    loadChildren: () => import('@pages/page').then((page) => page.PageModule),
  },
  {
    path: URL_CONTACT,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/contact').then((page) => page.ContactModule),
  },
  {
    path: URL_MYINVOICE,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/my-invoice').then((page) => page.MyInvoiceModule),
  },
  {
    path: URL_MYCONTACT,
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('@pages/my-contact').then((page) => page.MyContactModule),
  },
];
const privateRoute = [];
const routes: Routes = [...publicRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
