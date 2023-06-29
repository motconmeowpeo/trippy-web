import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../model/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
})
export class UserItemComponent implements OnInit {
  @Input() user!: IUser;
  constructor() {}

  ngOnInit() {}
}
