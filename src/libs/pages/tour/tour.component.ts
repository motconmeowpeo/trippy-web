import { Component, OnInit } from '@angular/core';
import { TourFacade } from '@core/services/tour';
import { Observable } from 'rxjs';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
})
export class TourComponent implements OnInit {
  tours$ = this.tourFacade.tours$;
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faUser = faUser;
  isLoading = false;
  constructor(private tourFacade: TourFacade) {}

  ngOnInit() {
    this.isLoading = true;
    this.tourFacade.getAll().subscribe(() => (this.isLoading = false));
  }
}
