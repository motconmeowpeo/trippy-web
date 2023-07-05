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
import { ICommentForm, IInvoiceForm } from './tourDetail.form';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalCloseStatus, PermissionCode, ReportCategory } from '@core/enum';
import { TourCommentFacade } from '@core/services/tour-comment';
import { format, add } from 'date-fns';
import {
  DEFAULT_FORMAT_DATE,
  HOUR_MINUTE_FORMAT_TIME,
  S3_URL,
  SETTING_FORMAT_DATE,
} from '@core/constants';
import { catchError, of, tap } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { ConfirmModalComponent } from '@core/ui/modal';
import { ITour } from '@core/model';
import { InvoiceFacade } from '@core/services/invoice';

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
  readonly S3_URL = S3_URL;
  readonly reportCategory = ['Location', 'Services', 'Price', 'Rooms'];
  slideConfig = { slidesToShow: 2, slidesToScroll: 2 };
  comments$ = this.tourCommentFacade.comments$;
  user$ = this.authFacade.user$;
  formComment!: FormGroup<ICommentForm>;
  formInvoice!: FormGroup<IInvoiceForm>;
  isPosting = false;
  isCreating = false;
  isDeleteing = false;
  PermissionCode = PermissionCode;
  total = 0;
  tour!: ITour;
  today = add(new Date(), { days: 7 });
  constructor(
    private tourFacade: TourFacade,
    private router: ActivatedRoute,
    private tourCommentFacade: TourCommentFacade,
    private authFacade: AuthFacade,
    private dialog: DialogService,
    private invoiceFacade: InvoiceFacade,
    private notifiService: ToastNotificationService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    const tourId = this.router.snapshot.paramMap.get('id');

    if (tourId) {
      this.createFormComment(tourId);
      this.createFormInvoice(tourId);
      this.tourFacade.getTourById(tourId).subscribe((tour) => {
        this.tour = tour;
        this.isLoading = false;
      });
      this.tourCommentFacade.getByTourId(tourId).subscribe();
    }
  }

  private createFormComment(id: string) {
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
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
  }

  private createFormInvoice(id: string) {
    this.formInvoice = new FormGroup({
      date: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      children: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      young: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      adult: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      serviceBooking: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      servicePerson: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
        updateOn: 'change',
      }),
      tourId: new FormControl(id, {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
    });
    this.caculatorTotal();
  }

  private caculatorTotal() {
    this.formInvoice.valueChanges
      .pipe(
        tap((formValue) => {
          this.total =
            (formValue?.adult || 0) * this.tour.tickets[0].price +
            (formValue.young || 0) * this.tour.tickets[1].price +
            (formValue?.children || 0) * this.tour.tickets[2].price +
            (formValue.serviceBooking ? 30 : 0) +
            (formValue.servicePerson ? 17 : 0);
        })
      )
      .subscribe();
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

  onCreateInvoice() {
    this.user$
      .pipe(
        tap((user) => {
          if (user) this.createInvoice(user?.id);
        }),
        catchError((err) => {
          this.isCreating = false;
          return of(err);
        })
      )
      .subscribe();
  }
  createInvoice(userId: string) {
    this.isCreating = true;
    this.invoiceFacade
      .create({
        ...this.formInvoice.value,
        userId,
        total: this.total,
      })
      .pipe(
        tap(() => {
          this.isCreating = false;
          this.notifiService.success('Success', 'Create invoice');
          this.formInvoice.reset();
        })
      )
      .subscribe();
  }
}
