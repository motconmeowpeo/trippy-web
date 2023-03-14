import { Component, OnInit } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {

  faFacebook = faFacebook
  faTwitter = faTwitter
  faInstagram = faInstagram
  faLinkedin = faLinkedin
  readonly SERVICES = [
    "Services",
    "Home",
    "Tours",
    "Destiination",
    "Blog",
    "Page",
    "Contact",
  ]
  readonly EXPLORES = [
    "Explores",
    "United State",
    "Canada",
    "Asia",
    "Africa",
    "Cambodia",
    "Europe",
  ]
  constructor() { }

  ngOnInit() {
  }

}
