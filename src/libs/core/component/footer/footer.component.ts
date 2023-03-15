import { Component, OnInit } from '@angular/core';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { EXPLORES, SERVICES } from '@core/constants';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  readonly SERVICES = SERVICES;
  readonly EXPLORES = EXPLORES;
  constructor() {}

  ngOnInit() {}
}
