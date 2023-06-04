/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { first, tap } from 'rxjs';
import { AuthFacade } from '../services/auth/auth.facade';
import { PermissionCode } from '../enum/role-code.enum';

@Directive({
  selector: '[permissions]',
})
export class PermissionsDirective implements OnInit {
  @Input() permissions!: number[];

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    if (!this.permissions?.length) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    this.authFacade.user$
      .pipe(
        first(),
        tap((user) => {
          this.permissions.some((code) => code === user?.code) ||
          user?.code === PermissionCode.ADMIN // ADMIN is strongest
            ? this.viewContainer.createEmbeddedView(this.templateRef)
            : this.viewContainer.clear();
        })
      )
      .subscribe();
  }
}
