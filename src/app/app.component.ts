/*
    이 mainNavChanged Subject은 주 nav menu를 활성화 시키는 역할을 수행한다
    만일 main nav상태가 false이면 main nav가 활성화 되어 있고 만일 true이면
    이 main nav는 hide되면서 상대적으로 teacher-nav-header가 활성화 되는 기능이다
    이기능에서 navStatus가 MainNavModel을 사용하고 있으며
    다음 3 가지 기능을 수행한다 1) showMainNav를 hide or not
                          2) logout 점검,
                          3) teacherLogin 점검
    또한 로그인 후 사용자 이름을 가져올수 있는 profileInfo정보를 수행하며 특히
    payment구현시 반드시 prfileInfo()가 localstorage에 저장된 userName을 가지고 와야
    property 'name' not defined error 가 발생하자 않는다
    이기능은 또한 routing 시 처음에는 곧바로 welcomComponent가 불러지므로 활성화 되지는 않지만
    logout/isAuth/teacherLogin/mainNav가 변경되자 마자 작동되는 기능이므로
    많은 시간을 소비한 곳이므로 잘 기억해두기 바란다
*/

import { AuthService_Local } from './auth/auth.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UtilityService } from './Utility-shared/utility.service';
import { MainNavModel } from './Utility-shared/mainNavChange.model';
import { Subscription } from 'rxjs/Subscription';

import { User } from './auth/user.model';
import { ShoppingcartService } from './payment/shoppingcart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {

  title = 'app';
  userInfo: User;

  userName = '';
  mainNavHide = false;
  isAuth = false;
  isteacherAuth = false;
  val = 0;

  utilitySubscription: Subscription;

  constructor(private utilityService: UtilityService,
              private authService: AuthService_Local,
              private router: Router,
              private shoppingCartService: ShoppingcartService,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {

    this.utilitySubscription = this.utilityService.mainNavChanged.subscribe((navStatus: MainNavModel) => {
            this.mainNavHide = navStatus.showMainNav;

            console.log('main nav 상태점검', this.mainNavHide);

            if (navStatus.checkLogoutOrNot) {               // logout상태가 호출되었으므로 모든것이 초기화됨

                                              this.isAuth = false;
                                              this.isteacherAuth = false;
            } else if (!navStatus.isTeacherLogin) {              // 일반 사용자 로그인
                                               this.isAuth = true;
                                               this.isteacherAuth = false;

            } else {                                        // login상태에서 홈버튼이 click한경우  teacher모드로 기존 토큰이 존재함
              this.isAuth = true;
              this.isteacherAuth = true;
            }

            this.userName = this.authService.getUserName();

          });

          this.router.routeReuseStrategy.shouldReuseRoute = function() {
                return false;
          };


          this.router.events.subscribe((evt) => {
              if (evt instanceof NavigationEnd) {
                  this.router.navigated = false;
                  window.scrollTo(0, 0);
              }
          });

  }

  ngOnDestroy() {
    this.utilitySubscription.unsubscribe();
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
