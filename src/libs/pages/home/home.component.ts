import { Component, OnInit } from '@angular/core';
import {
  faArrowRightLong,
  faQuoteLeft,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  faArrowRightLong = faArrowRightLong;
  faStar = faStar;
  faQuoteLeft = faQuoteLeft;
  readonly reviews = [
    {
      rReview:
        '“This was an amazing trip! There were so many highlights... our outstanding, kind, patient, amazing leader Gustavo!! What an absolute saint. He was so organized and”',
      rName: 'Cleveland A.',
      rAddress: 'New York, USA',
      rSrc: 'https://demo2.pavothemes.com/triply/wp-content/uploads/2020/11/about_image-5-2.jpg',
    },
    {
      rReview:
        '"Needless to say we are extremely satisfied with the results. Booking tour was the best investment I ever made. Nice work on your booking tour. Booking tour impressed."',
      rName: 'Melisa Joan H.',
      rAddress: 'New York, USA',
      rSrc: 'https://demo2.pavothemes.com/triply/wp-content/uploads/2020/11/about_image-5-2.jpg',
    },
    {
      rReview:
        '"Great job, I will definitely be ordering again! After using booking tour my business skyrocketed! Man, this thing is getting better and better as I learn more about it. "',
      rName: 'Roselin D.',
      rAddress: 'New York, USA',
      rSrc: 'https://demo2.pavothemes.com/triply/wp-content/uploads/2020/11/about_image-5-2.jpg',
    },
  ];
  readonly ADS = [
    {
      title: 'Weekly Flash Deal',
      detail: 'Up to 30%',
      btnText: ' View Deals',
    },
    {
      title: ' Exclusive Deals',
      detail: 'Want to save up 50%',
      btnText: 'Subscrise',
    },
    {
      title: 'Summer Escapes',
      detail: 'Plan your next trip',
      btnText: 'Learn More',
    },
  ];

  temp!: string;
  temp1: any;

  constructor() {}
  ngOnInit() {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }
}
