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
import {
  ModalCloseStatus,
  PayOption,
  PayStatus,
  PermissionCode,
  ReportCategory,
} from '@core/enum';
import { TourCommentFacade } from '@core/services/tour-comment';
import { format, add } from 'date-fns';
import {
  DEFAULT_FORMAT_DATE,
  HOUR_MINUTE_FORMAT_TIME,
  S3_URL,
  SETTING_FORMAT_DATE,
  URL_LOGIN,
  URL_MYINVOICE,
} from '@core/constants';
import { catchError, from, of, tap } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { ConfirmModalComponent } from '@core/ui/modal';
import { IInvoiceCommand, ITour, ITourComment } from '@core/model';
import { InvoiceFacade } from '@core/services/invoice';
import { environment } from 'src/environments/environment';

const stripe = require('stripe')(
  'sk_test_51NUtkGGAiJ1r1jURsmHjNvvUIbAhprIBd7oHTSl1Nfu9ZOuyAJWvwylquqXszQbD1CqxdNYKSmPbWy3sQCT4x7sb00nwIX18D9'
);

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
  avgLocation = 0;
  avgService = 0;
  avgPrice = 0;
  avgRoom = 0;
  paymentHandler: any = null;
  PayOption = PayOption;
  userId!: string;
  // stripe!: stripe.Stripe;
  constructor(
    private tourFacade: TourFacade,
    private router: ActivatedRoute,
    private tourCommentFacade: TourCommentFacade,
    private authFacade: AuthFacade,
    private dialog: DialogService,
    private invoiceFacade: InvoiceFacade,
    private notifiService: ToastNotificationService,
    private navigator: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.user$.subscribe((user) => (this.userId = user?.id || ''));
    const tourId = this.router.snapshot.paramMap.get('id');

    if (tourId) {
      this.createFormComment(tourId);
      this.createFormInvoice(tourId);
      this.tourFacade.getTourById(tourId).subscribe((tour) => {
        this.tour = tour;
        this.isLoading = false;
      });
      this.tourCommentFacade
        .getByTourId(tourId)
        .subscribe((comments) => this.caculatorRate());
    }
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      if (sessionStorage.getItem('invoice')) {
        const invoice: Partial<IInvoiceCommand> = JSON.parse(
          sessionStorage.getItem('invoice') || ''
        );
        this.invoiceFacade
          .create(invoice)
          .pipe(
            tap(() => {
              this.isCreating = false;
              this.notifiService.success('Success', 'Create invoice');
              this.formInvoice.reset();
              this.navigator.navigate([URL_MYINVOICE]);
            })
          )
          .subscribe();
      }
    }

    if (query.get('canceled')) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }

  // makePayment(userId: string) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51NUtkGGAiJ1r1jURLsEWt9pGeLUOvKcWeDqe8CtZzeYlKkAJKoYj2tf47RvEcPeRmu7UGU5you8FMHwdqeu5b1WT00RffQrfz5',
  //     locale: 'auto',
  //     // token: from(() => {
  //     //   return this.create(userId);
  //     // }),
  //   });
  //   paymentHandler.open({
  //     name: 'Pay your invoice',
  //     description: 'Choose pay method',
  //     amount: this.total * 100,
  //   });
  // }

  // invokeStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement('script');
  //     script.id = 'stripe-script';
  //     script.type = 'text/javascript';
  //     script.src = 'https://checkout.stripe.com/checkout.js';
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51NUtkGGAiJ1r1jURLsEWt9pGeLUOvKcWeDqe8CtZzeYlKkAJKoYj2tf47RvEcPeRmu7UGU5you8FMHwdqeu5b1WT00RffQrfz5',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken);
  //           alert('Payment has been successfull!');
  //         },
  //       });
  //     };
  //     window.document.body.appendChild(script);
  //   }
  // }

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
      payOption: new FormControl(PayOption.PAY_LATER as string, {
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
    if (this.userId) {
      this.postComment(this.userId);
    }
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
    this.tourCommentFacade
      .create(payload)
      .pipe(
        tap(() => {
          this.formComment.reset();
          this.isPosting = false;
        }),
        catchError((err) => {
          this.isPosting = false;
          return of(err);
        })
      )
      .subscribe();
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
    if (this.userId) {
      this.createInvoice(this.userId);
    } else {
      this.navigator.navigate([URL_LOGIN]);
    }
  }

  async payment(userId: string, total: number, payStatus: PayStatus) {
    const YOUR_DOMAIN = `${environment.currentUrl}${this.tour.id}`;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            product_data: {
              name: this.tour.name + ` Pay: $${total} / $${this.total}`,
              description: this.tour.description,
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    const invoice = {
      ...this.formInvoice.value,
      userId,
      total: this.total,
      paid: total,
      payStatus,
    };
    sessionStorage.setItem('invoice', JSON.stringify(invoice));
    window.location.href = session.url;
  }

  createInvoice(userId: string) {
    this.isCreating = true;
    if (this.formInvoice.value.payOption === PayOption.PAY_LATER) {
      this.invoiceFacade
        .create({
          ...this.formInvoice.value,
          userId,
          total: this.total,
          paid: 0,
        })
        .pipe(
          tap(() => {
            this.isCreating = false;
            this.notifiService.success('Success', 'Create invoice');
            this.formInvoice.reset();
            this.navigator.navigate([URL_MYINVOICE]);
          }),
          catchError((err) => {
            this.isCreating = false;
            return of(err);
          })
        )
        .subscribe();
    } else if (this.formInvoice.value.payOption === PayOption.ONE_THIRD)
      this.payment(userId, Math.floor(this.total / 3), PayStatus.ONE_THIRD);
    else {
      this.payment(userId, this.total, PayStatus.DONE);
    }
  }

  caculatorRate() {
    this.comments$.subscribe((comments) => {
      this.avgLocation =
        comments.reduce((step, value) => step + value.locationRate + 1, 0) /
        comments.length;
      this.avgService =
        comments.reduce((step, value) => step + value.servicesRate + 1, 0) /
        comments.length;
      this.avgPrice =
        comments.reduce((step, value) => step + value.priceRate + 1, 0) /
        comments.length;
      this.avgRoom =
        comments.reduce((step, value) => step + value.roomsRate + 1, 0) /
        comments.length;
    });
  }
}
