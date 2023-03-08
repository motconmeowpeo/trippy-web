import { Component, OnInit } from '@angular/core';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import * as AOS from 'aos'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  faArrowRightLong = faArrowRightLong
  readonly ADS = [
    {
      title: "Weekly Flash Deal",
      detail: "Up to 30%",
      btnText: " View Deals",
    },
    {
      title: " Exclusive Deals",
      detail: "Want to save up 50%",
      btnText: "Subscrise",
    },
    {
      title: "Summer Escapes",
      detail: "Plan your next trip",
      btnText: "Learn More",
    }

  ]
  constructor() { }
  ngOnInit() {
    AOS.init({
      duration: 1500,
      once: true
    });
  }
}
