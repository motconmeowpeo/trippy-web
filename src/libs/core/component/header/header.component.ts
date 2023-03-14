import { Component, OnInit } from '@angular/core';
import { faPlus, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  URL_BLOG,
  URL_CONTACT,
  URL_DESTINATION,
  URL_HOME,
  URL_PAGE,
  URL_TOUR,
} from '@core/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  readonly MENUS = [
    { name: 'Home', path: URL_HOME },
    { name: 'Tours', path: URL_TOUR },
    { name: 'Destination', path: URL_DESTINATION },
    { name: 'Blog', path: URL_BLOG },
    { name: 'Page', path: URL_PAGE },
    { name: 'Contact', path: URL_CONTACT },
  ];
  faPlus = faPlus;
  faPhoneVolume = faPhone;
  faUser = faUser;
  constructor() {}

  ngOnInit() {}
}
