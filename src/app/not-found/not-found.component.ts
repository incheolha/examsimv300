
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Component, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements AfterViewInit {

  @ViewChild('basicModal') basicModal: ModalDirective;

  constructor( private router: Router) {}

    ngAfterViewInit(): void {
    this.basicModal.show();
  }
  goBackToHome() {
    this.basicModal.hide();
    this.router.navigate(['/']);
  }
}
