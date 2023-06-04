import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
import { EXPLORES } from '@core/constants';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faLocationDot,
  faChevronDown,
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
})
export class SearchbarComponent implements OnInit {
  faLocationDot = faLocationDot;
  faChevronDow = faChevronDown;
  faCalendar = faCalendar;
  faUser = faUser;
  faSearch = faMagnifyingGlass;
  faClear = faCircleXmark;

  destinationValue: string = 'Where are you going ?';
  dateValue: Date | string = 'Date from';
  adultNumber: number = 0;
  youthNumber: number = 0;
  childrenNumber: number = 0;
  canClearInput = false;

  explore = EXPLORES;

  isShowGuests = false;
  minDate: any;

  constructor() {}

  ngOnInit() {
    var minDate = new Date();
    minDate.setDate(minDate.getDate() + 7);
    this.minDate = minDate.toISOString().substring(0, 10);
  }

  toggleShowGuests() {
    this.isShowGuests
      ? (this.isShowGuests = false)
      : (this.isShowGuests = true);
  }
  handleAdult(type: boolean) {
    type ? this.adultNumber++ : this.adultNumber--;
    if (this.adultNumber < 0) this.adultNumber = 0;
  }
  handleYouth(type: boolean) {
    type ? this.youthNumber++ : this.youthNumber--;
    if (this.youthNumber < 0) this.youthNumber = 0;
  }
  handleChildren(type: boolean) {
    type ? this.childrenNumber++ : this.childrenNumber--;
    if (this.childrenNumber < 0) this.childrenNumber = 0;
  }

  onInput() {
    this.canClearInput = true;
    if (this.explore.includes(this.destinationValue)) {
      console.log(this.destinationValue);
    }
  }

  clearInput() {
    this.canClearInput = false;
  }
}
