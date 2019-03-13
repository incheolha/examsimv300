import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  map = {
    lat: 37.368889,
    lng: 126.929667
  };

  constructor() { }

  ngOnInit() {
  }

}
