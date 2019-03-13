
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService_Local } from './../auth.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';   // google and facebook 인증위한 서비스
import { UtilityService } from './../../Utility-shared/utility.service';

import { User } from './../user.model';

import 'rxjs/add/operator/catch';
import { Subscription } from 'rxjs/Subscription';
import { PaidToeflList } from 'src/app/payment/model/paidToeflLists.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  pwdPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$';

  teacherAuth = false;
  isLoading = false;

  private loadingSubscriptiion: Subscription;

  constructor( private fb: FormBuilder,
               private authService: AuthService_Local,
               private socialAuthService: AuthService,
               private utilityService: UtilityService
              ) {}

  ngOnInit() {

    console.log('this is the login clicked');
    this.loadingSubscriptiion = this.utilityService.loadingStateChanged.subscribe(loadingStatus => {
      this.isLoading = loadingStatus;
    });

    this.loginForm = this.fb.group({
                      email: ['', Validators.required],
                      password: ['', [Validators.required,
                                      Validators.minLength(6)
                                ]]
                    });
    }

  onSubmit() {
    console.log(this.loginForm.value.email);
    const user = new User(this.loginForm.value.email,
                          this.loginForm.value.password);

    this.authService.login(user);
    this.loginForm.reset();
  }

  socialLogin( socialPlatform: string ) {
    let socialPlaformProvider;
    const currentDate = new Date();
    const updatedDate = new Date();

    const permissionTag = 'student';
    const toeflId = '';
    const paymentId = '';

    const paidToeflLists: PaidToeflList[] = [];
    const shoppingCartLists: any[] = [];
    const wishLists: any[] = [];

    if ( socialPlatform === 'facebook' ) {
      socialPlaformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if ( socialPlatform === 'google') {
      socialPlaformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn( socialPlaformProvider ).then((userData) => {


        const user = new User(userData.email,
                              userData.id,
                              userData.name,
                              permissionTag,
                              currentDate,
                              updatedDate,
                              userData.provider);

            console.log(socialPlatform + ' sign in data : ', userData);
            console.log('사용자 아이디: ', userData.id);
            console.log('사용자 이름: ', userData.name);
            console.log('사용자 이메일: ', userData.email);
            console.log('사용자 token: ', userData.token);
            console.log('사용자 image: ', userData.image);
            console.log('사용자 provider: ', userData.provider);

            this.authService.sociaLogin(user);

    });
  }
  ngOnDestroy() {
    this.loadingSubscriptiion.unsubscribe();
  }
}
