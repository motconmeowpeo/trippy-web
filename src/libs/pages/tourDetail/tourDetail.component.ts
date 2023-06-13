import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthFacade,
  ToastNotificationService,
  TourFacade,
  UserFacade,
} from '@core/services';
import {
  faClock,
  faUser,
  faUsers,
  faCheck,
  faClose,
  faLocationDot,
  faStar,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { ICommentForm } from './tourDetail.form';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalCloseStatus, PermissionCode, ReportCategory } from '@core/enum';
import { TourCommentFacade } from '@core/services/tour-comment';
import { format } from 'date-fns';
import { HOUR_MINUTE_FORMAT_TIME, SETTING_FORMAT_DATE } from '@core/constants';
import { tap } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { ConfirmModalComponent } from '@core/ui/modal';

@Component({
  selector: 'app-tourDetail',
  templateUrl: './tourDetail.component.html',
  styleUrls: ['./tourDetail.component.scss'],
})
export class TourDetailComponent implements OnInit {
  faClock = faClock;
  faUser = faUser;
  faUsers = faUsers;
  faCheck = faCheck;
  faClose = faClose;
  faLocationDot = faLocationDot;
  tour$ = this.tourFacade.tour$;
  isLoading = false;
  faStar = faStar;
  faArrowLeft = faArrowLeft;
  readonly reportCategory = ['Location', 'Services', 'Price', 'Rooms'];
  slideConfig = { slidesToShow: 2, slidesToScroll: 2 };
  comments$ = this.tourCommentFacade.comments$;
  user$ = this.authFacade.user$;
  formComment!: FormGroup<ICommentForm>;
  isPosting = false;
  isDeleteing = false;
  PermissionCode = PermissionCode;
  constructor(
    private tourFacade: TourFacade,
    private router: ActivatedRoute,
    private tourCommentFacade: TourCommentFacade,
    private authFacade: AuthFacade,
    private dialog: DialogService,
    private notifiService: ToastNotificationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const tourId = this.router.snapshot.paramMap.get('id');

    if (tourId) {
      this.createForm(tourId);
      this.tourFacade
        .getTourById(tourId)
        .subscribe(() => (this.isLoading = false));
      this.tourCommentFacade.getByTourId(tourId).subscribe();
    }
  }

  private createForm(id: string) {
    this.formComment = new FormGroup({
      content: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      locationRate: new FormControl(-1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      servicesRate: new FormControl(-1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      priceRate: new FormControl(-1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      roomsRate: new FormControl(-1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      tourId: new FormControl(id, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
    });
  }

  handlePostComment() {
    this.user$
      .pipe(
        tap((user) => {
          if (user) {
            this.postComment(user.id);
          }
        })
      )
      .subscribe();
  }

  deleteComment(id: string) {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          title: 'Delete comment',
          textSubmit: 'Delete',
          textCancel: 'Cancel',
        },
      })
      .afterClosed$.pipe(
        tap((status: any) => {
          if (status?.status === ModalCloseStatus.COMPLETE) {
            this.delete(id);
          }
        })
      )
      .subscribe();
  }

  delete(id: string) {
    this.tourCommentFacade.delete(id).subscribe(() => {
      this.notifiService.success('Success', 'Deleted comment');
    });
  }

  postComment(id: string) {
    const payload = {
      ...this.formComment.value,
      authorId: id,
    };
    this.isPosting = true;
    this.tourCommentFacade.create(payload).subscribe(() => {
      this.formComment.reset();
      this.isPosting = false;
    });
  }

  handleRate(category: string, rateNumber: number) {
    switch (category) {
      case ReportCategory.Location:
        this.formComment.controls['locationRate'].setValue(rateNumber);
        break;
      case ReportCategory.Price:
        this.formComment.controls['priceRate'].setValue(rateNumber);
        break;
      case ReportCategory.Rooms:
        this.formComment.controls['roomsRate'].setValue(rateNumber);
        break;
      case ReportCategory.Services:
        this.formComment.controls['servicesRate'].setValue(rateNumber);
        break;
    }
  }

  parseDateAndTime(time: Date): string {
    return format(
      new Date(time),
      `${SETTING_FORMAT_DATE} ${HOUR_MINUTE_FORMAT_TIME}`
    );
  }
}
