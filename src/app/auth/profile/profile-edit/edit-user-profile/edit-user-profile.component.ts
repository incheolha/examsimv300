import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../user.model';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent {

  @Input() userInfo: User;

  constructor() { }

}
