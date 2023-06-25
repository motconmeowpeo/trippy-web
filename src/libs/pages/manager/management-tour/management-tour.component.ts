import { Component, OnInit } from '@angular/core';

import { TourFacade } from '@core/services/tour';
import { DialogService } from '@ngneat/dialog';
import { CreateTourModalComponent } from '@core/ui/modal/create-tour-modal';
import { TestModal } from '@core/ui/modal/test';

@Component({
  selector: 'app-management-tour',
  templateUrl: './management-tour.component.html',
})
export class ManagementTourComponent implements OnInit {
  tours$ = this.tourFacade.tours$;
  isLoading = false;
  currentPage = 1;
  limit = 5;
  canNext = true;
  canPrev = false;
  constructor(private tourFacade: TourFacade, private dialog: DialogService) {}

  pageLimitOptions: number[] = [5, 10, 20, 50];
  total: number = 0;
  ngOnInit() {
    this.isLoading = true;
    this.calculateTotal();
    this.tourFacade.getAll().subscribe(() => (this.isLoading = false));
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

  onLimitChange(limit: number): void {
    console.log(limit);
  }
}
