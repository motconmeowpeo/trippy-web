import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../model/user.model';
import { faBan, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '@ngneat/dialog';
import { ConfirmModalComponent } from '@core/ui/modal';
import { tap } from 'rxjs';
import { ModalCloseStatus } from '@core/enum';
import { UserFacade } from '@core/services';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
})
export class UserItemComponent implements OnInit {
  @Input() user!: IUser;
  faBan = faBan;
  faLockOpen = faLockOpen;
  constructor(private dialog: DialogService, private userFacade: UserFacade) {}

  ngOnInit() {}

  openChangeStatus(id: string) {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          title: this.user.active ? 'Block user' : 'Unblock user',
          description: this.user.active
            ? 'This user will be can not login'
            : 'Are you sure unblock this user',
          textSubmit: 'Submit',
          textCancel: 'Cancel',
        },
      })
      .afterClosed$.pipe(
        tap((status: any) => {
          if (status?.status === ModalCloseStatus.COMPLETE) {
            this.changeStatus(id);
          }
        })
      )
      .subscribe();
  }

  changeStatus(id: string) {
    this.userFacade.changeStatus(id).subscribe();
  }
}
