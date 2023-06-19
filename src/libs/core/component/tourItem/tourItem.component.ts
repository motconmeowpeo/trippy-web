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
  @Input() disableMenu = true;

  constructor(private dialog: DialogService) {}

  toggleMenu() {
    this.isShown = !this.isShown;
  }

  openDeleteTour(id: string) {
    this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Delete Tour',
        textSubmit: 'Delete',
        textCancel: 'Cancel',
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

  openEditTour(id: string) {
    this.dialog.open(UpdateTourModalComponent, {
      data: {
        title: 'Update Tour',
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

  ngOnInit() {}
}
