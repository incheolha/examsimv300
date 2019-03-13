import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService_Local } from '../../auth/auth.service';
import { ShoppingcartService} from '../../payment/shoppingcart.service';
import { Shoppingcart } from '../../payment/model/shoppingcart.model';
import { ProfileInfo } from '../../auth/profile.model';
import { User } from '../../auth/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

// 상단 navBar와 sideMenu와 관련한 변수설정
    @Output() sidenavToggle = new EventEmitter<void>();
    @Input() isAuth: boolean;
    @Input() isteacherAuth: boolean;
    @Input() userName: string;

// 인증관련 Subscription 변수설정
    authSubscription: Subscription;
    teacherAuthSubscription: Subscription;

// shoppingcart에 관한 변수설정
    shoppingcartLists: Shoppingcart[] = [];
    shoppingcartListCounter = 0;
    shoppingcartListSubscription: Subscription;

constructor(private authService: AuthService_Local,
            private shoppingcartService: ShoppingcartService) { }

  ngOnInit() {

   // 인증관련 Subject설정
    this.authSubscription = this.authService.authChange.subscribe((authStatus: boolean) => {
          // 로그인 여부 확인
                    this.isAuth = authStatus;
          // 로그인이 되어 있지 않으면 shoppingcartLists를 초기화한다
                    if (!this.isAuth) {
                      this.shoppingcartLists = [];
                      this.shoppingcartListCounter = 0;
                    } else {
                        // 사용자 프로파일중 이름을 가져온다
                        this.userName = this.authService.getUserName();

                        console.log('인증후 현재 사용자 정보', this.userName);

                        // 로그인이 되어 있고 teacher mode가 아니면 shopping cart를 활성화 시킨다
                        if (!this.isteacherAuth) {
                          this.shoppingcartListSubscription = this.shoppingcartService.shoppingCartListAdded
                                                            .subscribe((shoppingcart: Shoppingcart[]) => {
                                                            // tslint:disable-next-line:max-line-length
                                                            this.shoppingcartLists = shoppingcart.sort((a, b) => 0 - (a.examNo > b.examNo ? -1 : 1));
                                                            // tslint:disable-next-line:max-line-length
                                                            this.shoppingcartListCounter = this.shoppingcartLists.length;

                                                          });
                          // 처음 angular가 접속하였을시 node server로 부터 인증된 user 정보에서 shopping cart 와 paidToeflLists 정보 가져오기
                              this.shoppingcartService.connectAuthShoppingCart();
                          }

                      }
                            // 시험출제자 선생님 인증관련 영역
                            this.teacherAuthSubscription = this.authService.teacherAuth.subscribe((teacherStatus: boolean) => {
                              this.isteacherAuth = teacherStatus;
                   });

    });

  }
    // 유저가 헤더부분에 있는 쇼핑목록을 지웠을때 실행됨.
    shoppingcartItemDelete(shoppingcartItem: Shoppingcart) {
      this.shoppingcartService.shoppingCartItemRemoved(shoppingcartItem);
    }

    // 헤더 쇼핑카트부분에 있는 체크아웃 버튼을 눌렀을때 paymentPreview Page로 이동합니다.
    goShoppingListCheckOut() {
      this.shoppingcartService.goCheckOut();
    }

    // 서버에 shopping cart내용을 정리한후 훗날 재사용할 수 있도록 하는 기능추가
    goShoppingListSave() {
      this.shoppingcartService.goSave();
    }

    onToggleSideNav() {
      this.sidenavToggle.emit();
    }

    ngOnDestroy() {
      this.authSubscription.unsubscribe();
      if (!this.isteacherAuth) {
        this.shoppingcartListSubscription.unsubscribe();
      }
      this.teacherAuthSubscription.unsubscribe();
  }

}

