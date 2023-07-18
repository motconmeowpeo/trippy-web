import { Component, OnInit } from '@angular/core';

import { TourFacade } from '@core/services/tour';
import { DialogService } from '@ngneat/dialog';
import { CreateTourModalComponent } from '@core/ui/modal/create-tour-modal';
import { TestModal } from '@core/ui/modal/test';
import { AuthFacade } from '../../../core/services/auth/auth.facade';
import { FormControl, FormGroup } from '@angular/forms';
import { ISearchForm } from './management-tour.form';
import { debounceTime, tap } from 'rxjs';
import { IBaseParams } from '@core/model';

@Component({
  selector: 'app-management-tour',
  templateUrl: './management-tour.component.html',
})
export class ManagementTourComponent implements OnInit {
  tours$ = this.tourFacade.tours$;
  user$ = this.authFacade.user$;
  isLoading = false;
  currentPage = 1;
  limit = 5;
  canNext = true;
  canPrev = false;
  form!: FormGroup<ISearchForm>;
  search = '';
  userId = '';
  constructor(
    private tourFacade: TourFacade,
    private dialog: DialogService,
    private authFacade: AuthFacade
  ) {}

  pageLimitOptions: number[] = [5, 10, 20, 50];
  total: number = 0;
  ngOnInit() {
    this.isLoading = true;
    this.calculateTotal();
    this.createForm();
    this.user$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.tourFacade
          .getTourByManager(user?.id)
          .subscribe(() => (this.isLoading = false));
      }
    });
  }

  calculateTotal(): void {
    this.tours$.subscribe((tours) => {
      this.total = tours.length;
    });
  }

  openCreateTour() {
    this.dialog.open(CreateTourModalComponent, {
      data: {
        title: 'Create Tour',
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

  onGoToPage(page: number): void {
    alert('you just clicked the GoToPage button');

    this.currentPage = page;
    this.canNext = true;
    this.canPrev = true;
    if (this.currentPage >= this.total / this.limit) {
      this.canNext = false;
    } else if (this.currentPage <= 1) {
      this.canPrev = false;
    }
  }

  onNextPage(): void {
    alert('you just clicked the NextPage button');

    this.currentPage = this.currentPage + 1;
    this.canPrev = true;
    if (this.currentPage >= this.total / this.limit) {
      this.canNext = false;
    }
  }

  onPreviousPage(): void {
    alert('you just clicked the PreviousPage button');

    this.currentPage = this.currentPage - 1;
    this.canNext = true;
    if (this.currentPage <= 1) {
      this.canPrev = false;
    }
  }

  onLimitChange(limit: number): void {}

  private createForm() {
    this.form = new FormGroup({
      search: new FormControl('', { nonNullable: true }),
    });
    this.handleSearch();
  }

  private handleSearch() {
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap((formValue) => {
          this.search = formValue.search || '';
          this.searchTour({ search: this.search });
        })
      )
      .subscribe();
  }

  private searchTour(params?: IBaseParams) {
    if (this.userId) {
      this.isLoading = true;

      this.tourFacade
        .getTourByManager(this.userId, params)
        .subscribe(() => (this.isLoading = false));
    }
  }
}
