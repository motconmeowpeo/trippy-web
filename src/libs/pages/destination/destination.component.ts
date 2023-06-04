import { Component, OnInit } from '@angular/core';
import { DESTINATION_LIST } from '@core/constants';
import { IDestination } from '@core/model';
import { TourFacade } from '@core/services/tour';
import { Observable } from 'rxjs';
import * as AOS from 'aos';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
})
export class DestinationComponent implements OnInit {
  tours$ = this.tourFacade.getAll();
  destination: IDestination[] = DESTINATION_LIST;
  constructor(private tourFacade: TourFacade) {}

  ngOnInit() {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }
}
