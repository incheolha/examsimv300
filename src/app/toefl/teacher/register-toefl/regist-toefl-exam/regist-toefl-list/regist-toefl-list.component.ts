
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RegisterToeflService } from '../../../teacher.service';

import { Toefl } from '../../../../models/toefl.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UtilityService } from './../../../../../Utility-shared/utility.service';

@Component({
  selector: 'app-regist-toefl-list',
  templateUrl: './regist-toefl-list.component.html',
  styleUrls: ['./regist-toefl-list.component.scss']
})
export class RegistToeflListComponent implements OnInit, OnDestroy {

  toefls: Toefl[] = [];
  emptyCehcked = false;
  toeflListHide = false;

  toeflListSubscription: Subscription;
  toeflListHideSubscription: Subscription;
  utilityServiceSubscription: Subscription;

  constructor(private registerToeflService: RegisterToeflService,
              private router: Router,
              private route: ActivatedRoute,
              private utilityService: UtilityService
             ) { }

  ngOnInit() {

    this.toeflListHideSubscription = this.utilityService.toeflListShowChanged
                                     .subscribe((toeflListHIdeStatus: boolean) => {
                                       this.toeflListHide = toeflListHIdeStatus;
                                     });

    this.toeflListSubscription = this.registerToeflService.registerToeflExamChanged
                                     .subscribe((recentToefls: Toefl[]) => {
                                       this.toefls = recentToefls;
                                       console.log('최신 토플명단', this.toefls);
                                      });

    this.utilityServiceSubscription = this.utilityService.stepperCheck.
                                      subscribe((stepCheckStatus: boolean) => {
                                                  this.toeflListHide = stepCheckStatus;
                                                  console.log(this.toeflListHide);
                                      });

    this.toefls = this.registerToeflService.getRegisterToefls();   // 변경된 최신 토플 시험을 가져옴
  }



  onNewToeflRegistration() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.toeflListSubscription.unsubscribe();
    this.toeflListHideSubscription.unsubscribe();
    this.utilityServiceSubscription.unsubscribe();
  }
}
