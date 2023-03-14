import { Component, OnInit } from '@angular/core';
import { ITour, TourService } from '@core/services/tour';
import { Observable } from 'rxjs';
import { faLocationDot, } from '@fortawesome/free-solid-svg-icons'
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons'
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
})
export class TourComponent implements OnInit {
  tours$: Observable<ITour[]> = this.tourService.getAll()
  faLocationDot = faLocationDot
  faCalendar = faCalendar
  faUser = faUser
  constructor(private tourService: TourService) { }

  ngOnInit() {
  }

}
