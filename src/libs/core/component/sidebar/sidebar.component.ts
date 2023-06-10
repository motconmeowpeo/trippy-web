import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';
import { MENU_GROUP } from './sidebar.constant';
import { ISidebarMenu } from './sidebar.constant';
import {
  asyncScheduler,
  filter,
  first,
  fromEvent,
  map,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { AuthFacade, ShellFacade } from '@core/services';
import { BaseComponent } from '@core/base';
import { EVENT_BROWSER_BACK_AND_FORWARD, KEYBOARD } from '@core/constants';
import { URL_TOUR } from '@pages/manager';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends BaseComponent {
  MENU_GROUP = MENU_GROUP;

  isSidebarExpanded$!: Observable<boolean>;
  isSidebarSwitched$!: Observable<boolean>;
  sidebarItemsState: Record<string, boolean> = {};
  isComponentFirstLoaded = true;
  changeMenuSubscription!: Subscription;

  constructor(
    private router: Router,
    private shellFacade: ShellFacade,
    private authFacade: AuthFacade
  ) {
    super();
  }

  ngOnInit(): void {}
}
