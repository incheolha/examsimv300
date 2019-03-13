import { GlobalConstantShare } from '../Utility-shared/globalConstantShare';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { UtilityService } from './../Utility-shared/utility.service';
import { MainNavModel } from './../Utility-shared/mainNavChange.model';
import { User } from './user.model';

import { Shoppingcart } from '../payment/model/shoppingcart.model';
import { PaidToeflList } from '../payment/model/paidToeflLists.model';
import { ProfileInfo } from './profile.model';


@Injectable()
export class AuthService_Local {

  urlConfig = GlobalConstantShare.httpUrl;     // 현재 설정ehls url 주소 설정
  authChange = new Subject<boolean>();
  teacherAuth = new Subject<boolean>();

  mainNavModel: MainNavModel;

  userName: string;             // 메인 header에 필요한 사용자 이름을 가조오기위한 모델
  user: User;                             // 사용자에 관한 모든정보를 가져오기 위한 user 모델

  currentUser: User;

  clearPaidToeflLists: PaidToeflList[] = [];
  clearShoppingCartLists: Shoppingcart[] = [];
  clearProfileInfoPassed: ProfileInfo = null;

  isAuthenticated = false;
  isteacherAuthenticated = false;

  public shoppingCartLists = new Subject<Shoppingcart[]>();
  public paidToeflLists = new Subject<PaidToeflList[]>();
  public userInfoList = new Subject<User>();

  constructor(private http: HttpClient,
              private router: Router,
              private utilityService: UtilityService) {}
  signup(user: User) {

        this.utilityService.loadingStateChanged.next(true);
        this.http.post
                      <{ message: string,
                          token: string,
                          user: User
                          // userName: string,
                          // permissionTag: string,
                          // shoppingCartLists: Shoppingcart[],
                          // paidToeflLists: PaidToeflList[]
                        }>
                        (this.urlConfig + '/user/signup', user)

                        .subscribe((result) => {

                                localStorage.setItem('token', result.token);
                                localStorage.setItem('userName', result.user.name);
                                this.currentUser = result.user;
                                this.authSuccess(result.user.permissionTag);
                                this.utilityService.loadingStateChanged.next(false);
                                this.shoppingCartLists.next(result.user.shoppingCartLists);
                                this.paidToeflLists.next(result.user.paidToeflLists);
                                this.router.navigate(['/']);
                    },
                    error => { this.handleError( error ); });
  }

  login(user: User) {

        this.utilityService.loadingStateChanged.next(true);
        this.http.post
                      <{ message: string,
                          token: string,
                          user: User
                          // userName: string,
                          // permissionTag: string,
                          // shoppingCartLists: Shoppingcart[],
                          // paidToeflLists: PaidToeflList[]
                        }>
                        (this.urlConfig + '/user/login', user)

                        .subscribe((result) => {
                                localStorage.setItem('token', result.token);
                                localStorage.setItem('userName', result.user.name);
                                this.currentUser = result.user;
                                this.authSuccess(result.user.permissionTag);
                                this.utilityService.loadingStateChanged.next(false);
                                this.shoppingCartLists.next(result.user.shoppingCartLists);
                                this.userInfoList.next(result.user);
                                this.paidToeflLists.next(result.user.paidToeflLists);
                                this.router.navigate(['/']);
                    },
                    error => { this.handleError( error ); });
              }


  sociaLogin(user: User) {

    this.utilityService.loadingStateChanged.next(true);
    this.http.post
                  <{ message: string,
                      token: string,
                      user: User
                      // userName: string,
                      // permissionTag: string,
                      // shoppingCartLists: Shoppingcart[],
                      // paidToeflLists: PaidToeflList[]
                    }>
                    (this.urlConfig + '/user/sociaLogin', user)

                    .subscribe((result) => {
                            localStorage.setItem('token', result.token);
                            localStorage.setItem('userName', result.user.name);
                            this.currentUser = result.user;
                            this.authSuccess(result.user.permissionTag);
                            this.utilityService.loadingStateChanged.next(false);
                            this.shoppingCartLists.next(result.user.shoppingCartLists);
                            this.userInfoList.next(result.user);
                            this.paidToeflLists.next(result.user.paidToeflLists);
                            this.router.navigate(['/']);
                },
                error => { this.handleError( error ); });
          }

  private handleError(error) {
    console.log('에러 메세지', error);
    this.authChange.next(false);
    this.utilityService.loadingStateChanged.next(false);
    return;
  }

  private authSuccess(teacherAuth: string) {
    this.authChange.next(true);
    console.log(this.authChange);

        if (localStorage.getItem('token') !== null) {
            this.isAuthenticated = true;
        }
        if (teacherAuth === 'teacher') {
          this.teacherAuth.next(true);
          this.isteacherAuthenticated = true;
        } else {
          this.teacherAuth.next(false);
          this.isteacherAuthenticated = false;
        }
        this.router.navigate(['/']);
  }

  logout() {
              localStorage.removeItem('token');
              localStorage.removeItem('userName');

              this.authChange.next(false);                             // 사용자 인증 logout
              this.teacherAuth.next(false);                            // teacher permission 초기화
              this.isAuthenticated = false;                             // 인증 취소
              this.isteacherAuthenticated = false;                      // 관리자 선생님 인증 취소

              this.paidToeflLists.next(this.clearPaidToeflLists);            // paid ToeflList 초기화
              this.shoppingCartLists.next(this.clearShoppingCartLists);      // shopping cart list 초기화

              this.mainNavModel = new MainNavModel(false, true);             // 인증 clear

              this.utilityService.mainNavChanged.next(this.mainNavModel);    // main 화면 navigation활성화
              this.router.navigate(['/']);                                   // main 홈페이지 화면으로 돌아감
  }

  isAuth() {
              console.log(this.isAuthenticated);
              return this.isAuthenticated;
  }


  isTecherAuth() {                                                 // welcome component에서 teacher인증여부를 각 tabl에 injection하여
              return this.isteacherAuthenticated;                            // 선생님 관리자 모드인 경우 장바구니버튼과 purchase버튼을 보여주지 않을목적으로 설정됨
  }

  getUserName() {
              console.log('현재 사용자 정보');
              this.userName = localStorage.getItem('userName');
  return this.userName;
  }

  getUserInfo() {
  return this.currentUser;
  }

}
