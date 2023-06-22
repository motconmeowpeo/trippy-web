import { Component, OnInit, Input } from '@angular/core';
import {
  faLocationDot,
  faArrowRightLong,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { DialogService } from '@ngneat/dialog';
import { ConfirmModalComponent } from '@core/ui/modal';
import { UpdateTourModalComponent } from '@core/ui/modal/update-tour-modal';
import { ITour } from '@core/model';
import { catchError, of, tap } from 'rxjs';
import { TourFacade } from '@core/services/tour';
import { ModalCloseStatus } from '@core/enum';
import { ToastNotificationService } from '@core/services';

@Component({
  selector: 'app-tourItem',
  templateUrl: './tourItem.component.html',
})
export class TourItemComponent implements OnInit {
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faUser = faUser;
  faRight = faArrowRightLong;
  isRouter = false;
  faEllipsis = faEllipsis;
  isShown = false;
  @Input() imgSrc!: string;
  @Input() tourName!: string;
  @Input() tourLocation!: string;
  @Input() tourPrice!: string;
  @Input() tourDays!: number | string;
  @Input() tourPeople!: number | string;
  @Input() id!: string;
  @Input() disableExplore = false;
  @Input() classBox!: string;
  @Input() tour!: ITour;

  constructor(
    private dialog: DialogService,
    private tourFacade: TourFacade,
    private toast: ToastNotificationService
  ) {}
  ngOnInit() {}
  openDeleteTour(id: string) {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          title: 'Delete Tour',
          description: 'You can not revert this tour after delete',
          textSubmit: 'Delete',
          textCancel: 'Cancel',
        },
      })
      .afterClosed$.pipe(
        tap((status: any) => {
          if (status?.status === ModalCloseStatus.COMPLETE) {
            this.deleteTour(id);
          }
        })
      )
      .subscribe();
  }

  openEditTour(tour: ITour) {
    this.dialog.open(UpdateTourModalComponent, {
      data: {
        title: 'Update Tour',
        tour,
      },
    });
    // .afterClosed$.pipe(
    //   tap((status: any) => {
    //     if (status?.status === ModalCloseStatus.COMPLETE) {
    //       this.delete(id);
    //     }
    //   })
    // )
    // .subscribe();
  }

  deleteTour(id: string) {
    this.tourFacade
      .delete(id)
      .pipe(
        tap(() => {
          this.toast.success('Success', 'Deleted tour');
        }),
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe();
  }
}
