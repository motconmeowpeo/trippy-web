import { Component, OnInit, Input } from '@angular/core';
import {
  faLocationDot,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-tourItem',
  templateUrl: './tourItem.component.html',
})
export class TourItemComponent implements OnInit {
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faUser = faUser;
  faRight = faArrowRightLong;
  @Input() imgSrc!: string;
  @Input() tourName!: string;
  @Input() tourLocation!: string;
  @Input() tourPrice!: string;
  @Input() tourDays!: string;
  @Input() tourPeople!: string;
  @Input() id!: string;

  constructor() {}

  ngOnInit() {}
}
