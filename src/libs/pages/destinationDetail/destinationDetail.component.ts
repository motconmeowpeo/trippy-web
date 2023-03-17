import { Component, OnInit } from '@angular/core';
import { DESTINATION_LIST } from '@core/constants';
import { IDestination } from '@core/model';
import { TourService, ITour } from '@core/services/tour';
import { Observable } from 'rxjs';
import * as AOS from 'aos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destinationdetail',
  templateUrl: './destinationDetail.component.html',
})
export class DestinationDetailComponent implements OnInit {
  tours$: Observable<ITour[]> = this.service.getAll();
  name: string | null;
  constructor(
    private service: TourService,
    private activatedRoute: ActivatedRoute
  ) {
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(this.name);
  }

  ngOnInit() {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }
}
