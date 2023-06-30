import { Component, OnInit } from '@angular/core';
import { 
  faCompass,
  faPhone,
  faEnvelopeOpen,
  faClock,

 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  faCompass = faCompass;
  faEnvelopeOpen = faEnvelopeOpen;
  faPhone = faPhone;
  faClock = faClock;
  
  constructor() {}

  ngOnInit() {}
}
