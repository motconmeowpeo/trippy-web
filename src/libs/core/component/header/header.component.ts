import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faPlus, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthFacade } from '@core/services';
import { fromEvent, takeWhile, map, tap } from 'rxjs';
import {
  URL_BLOG,
  URL_CONTACT,
  URL_DESTINATION,
  URL_HOME,
  URL_PAGE,
  URL_TOUR,
} from '@core/constants';
import { PermissionCode } from '../../enum/role-code.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menuElement!: ElementRef;

  readonly MENUS = [
    { name: 'Home', path: URL_HOME },
    { name: 'Tours', path: URL_TOUR },
    { name: 'Destination', path: URL_DESTINATION },
    { name: 'Blog', path: URL_BLOG },
    { name: 'Page', path: URL_PAGE },
    { name: 'Contact', path: URL_CONTACT },
  ];

  PermissionCode = PermissionCode;
  faPlus = faPlus;
  faPhoneVolume = faPhone;
  faUser = faUser;
  isAuthorized = false;
  isMenuShown = true;
  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    return this.authFacade.isAuthenticated().subscribe((isAuth) => {
      this.isAuthorized = isAuth;
      this.isMenuShown = false;
    });
  }

  toggleMenu() {
    this.isMenuShown = !this.isMenuShown;
    this.handleClickOutside();
  }

  logOut() {
    this.authFacade.logout();
  }

  private handleClickOutside() {
    const menuEl = this.menuElement?.nativeElement;

    fromEvent(document, 'click')
      .pipe(
        takeWhile(() => this.isMenuShown),
        map((event) => event.target as HTMLElement),
        tap((target) => {
          this.isMenuShown = menuEl?.contains(target);
        })
      )
      .subscribe();
  }
}
