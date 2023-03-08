import { Component, OnInit } from '@angular/core';
import { DESTINATION_LIST } from '@core/constants';
import { IDestination } from '@core/model';
import { TourService, ITour } from '@core/services/tour';
import { Observable } from 'rxjs';
import * as AOS from 'aos';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
})
export class DescriptionComponent implements OnInit {
  tours$: Observable<ITour[]> = this.service.getAll()
  destination: IDestination[] = DESTINATION_LIST
  constructor(private service: TourService) { }

  ngOnInit() {
    AOS.init({
      duration: 1500,
      once: true
    });
  }

}
