import { Component, OnInit } from '@angular/core';
import { ShellFacade } from '@core/services';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
})
export class ManagerComponent implements OnInit {
  isSidebarExpanded$ = this.shellFacade.isSidebarExpanded$;

  constructor(private shellFacade: ShellFacade) {}

  ngOnInit() {}
}
