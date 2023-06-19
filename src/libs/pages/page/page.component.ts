import {
  Component,
  OnInit,
  ElementRef,
} from '@angular/core';
import {
  faArrowRightLong,
  faShoePrints,
  faLocationDot,
  faHelmetSafety,
  faUmbrellaBeach,
  faHandHoldingDollar,
  faTicket,
  faEarthAmericas,
  faCompass,
  faSuitcaseRolling,
  faCameraRetro,
  faStar,
  faQuoteLeft,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

export interface review {
  rReview: string;
  rName: string;
  rAddress: string;
  rSrc: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  showButton: boolean = false;
  reviews: review[] = [];
  scrollValues: string[] = [];

  faArrowRightLong = faArrowRightLong;
  faShoePrints = faShoePrints;
  faLocationDot = faLocationDot;
  faHelmetSafety = faHelmetSafety;
  faUmbrellaBeach = faUmbrellaBeach;
  faHandHoldingDollar = faHandHoldingDollar;
  faTicket = faTicket;
  faEarthAmericas = faEarthAmericas;
  faCompass = faCompass;
  faSuitcaseRolling = faSuitcaseRolling;
  faCameraRetro = faCameraRetro;
  faStar = faStar;
  faQuoteLeft = faQuoteLeft;
  faAngleUp = faAngleUp;

  constructor(private elementRef: ElementRef) {
    this.reviews = [
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
  }

  ngOnInit() {}

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  animationRandom(index: number, value: number) {
    setTimeout(() => {
      const interval = setInterval(() => {
        this.scrollValues[index] = Math.floor(Math.random() * (value + 1)) + ''; // Random giá trị từ 0 đến value
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        this.scrollValues[index] = value + '';
      }, 1000);
    }, index * 100);
  }

  handleScroll(index: number, value: number) {
    if (!this.scrollValues[index]) {
      this.animationRandom(index, value);
    }
  }
}
