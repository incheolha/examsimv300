
import { GlobalConstantShare } from '../Utility-shared/globalConstantShare';

import { PaidToeflList } from './model/paidToeflLists.model';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Shoppingcart } from './model/shoppingcart.model';

import { AuthService_Local } from '../auth/auth.service';
import { UtilityService } from '../Utility-shared/utility.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../auth/user.model';
@Injectable()

export class ShoppingcartService {

    urlConfig = GlobalConstantShare.httpUrl;
    shoppingCartLists: Shoppingcart[] = [];
    paidToeflLists: PaidToeflList[] = [];                              // 실제 shopping item을 저장하는 공간
    shoppingCartListAdded = new Subject<Shoppingcart[]>();
    paidToeflListAdded = new Subject<PaidToeflList[]>();
    userInfoListUpdated = new Subject<User>();
    currentCart: Shoppingcart;

    paypalCheck = false;

    userInfo: User;

    paidToeflListSubscription: Subscription;
    serverCartListSubscription: Subscription;
    userInfoSubscription: Subscription;

    constructor (
        private http: Http,
        private router: Router,
        private authService: AuthService_Local,
        private utilityService: UtilityService) {}


// 사용자가 인증을 하였을시 자동으로 이 method를 이용하여 User에 저장된 shoppingCartList를 가저온다
connectAuthShoppingCart() {
      this.serverCartListSubscription = this.authService.shoppingCartLists.subscribe((shoppingcart: Shoppingcart[]) => {
                                          this.shoppingCartLists = shoppingcart;
                                          this.shoppingCartListAdded.next(this.shoppingCartLists);  // header에 있는 shopping list에 보냄
      });

      this.paidToeflListSubscription = this.authService.paidToeflLists.subscribe((paidToeflLists: PaidToeflList[]) => {
                                          this.paidToeflLists = paidToeflLists;
                                          this.paidToeflListAdded.next(this.paidToeflLists);
      });

}

// 사용자가 로그인이 완료된 시점에서만 작동하며 welcome.component->tabset->장바구니를 클릭하였을시 작동됨
  addShoppingCartList(newShoppingCartItem: Shoppingcart) {

      const findShoppingItem = this.shoppingCartLists.filter( (shoppingCart: Shoppingcart) => {
                               return shoppingCart.examNo === newShoppingCartItem.examNo;
                               } );

      console.log('새로운 쇼핑카트 아이템', newShoppingCartItem );
      console.log('현재 쇼핑 카트안에서 추가된 쇼핑 카트내에 존재하지 않으면 0 이고 새로운 카트에 리스트를 추가한다');
      if (findShoppingItem.length === 0) {
        console.log('new item listed on Shoppingcart.');
        this.shoppingCartLists.push(newShoppingCartItem);
        console.log(this.shoppingCartLists);
        this.utilityService.successToast( '선택하신 회차가 장바구니에 담겼습니다.', '공지사항');
        this.shoppingCartListAdded.next(this.shoppingCartLists);                           // header에 있는 shopping list에 보냄
      } else {
        this.utilityService.errorToast('선택하신 회차가 이미 장바구니에 있습니다.', '에러공지');
      }

  }

  // header.component에서 cart 지우기를 눌렀을때 사용
      shoppingCartItemRemoved(shoppingCartItem: Shoppingcart) {

          const findItemNumber = this.shoppingCartLists.indexOf(shoppingCartItem);
          this.shoppingCartLists.splice(findItemNumber, 1);                                // shopping item 제거
          this.shoppingCartListAdded.next(this.shoppingCartLists);                         // update된 shopping list를 header로 보냄
      }

  // payPal and Stripe 결재후 shoppingcartlist와 paidToeflLists를 updated하는 모드
      reInitialShoppingCartLists(paidToeflLists, userInfo) {
              console.log(paidToeflLists);
              console.log(userInfo);
              this.shoppingCartLists = [];
              this.paidToeflLists = paidToeflLists;
              this.userInfo = userInfo;
              this.shoppingCartListAdded.next(this.shoppingCartLists);   // shopping cart를 초기화로 updated시킬때 사용
              this.paidToeflListAdded.next(paidToeflLists);              // welcomeComponent를 updated할대 사용하는 Subject
              return true;
      }

      getShoppingCartLists() {
        return this.shoppingCartLists;
      }

      getPaidToefltLists() {

        console.log(this.paidToeflLists);
        return this.paidToeflLists;
      }

      getUserInfoListFromShoppingCartService() {
        console.log(this.userInfo);
        return this.userInfo;
      }
      goCheckOut() {
        this.router.navigate(['/payment/shoppingcart']);
      }

      goSave() {
        const token = localStorage.getItem('token');
        const body = JSON.stringify(this.shoppingCartLists);

        const header = new Headers({'Content-type': 'application/json'});

        this.http.post(this.urlConfig + '/shoppingcart/' + '?token=' + token, body, {headers: header})
                 .subscribe(
                              (res: Response) => {
                                  console.log(res);
                                  const data = res.json();
                                  console.log(data.result);
                                  this.shoppingCartLists = [];
                                  this.shoppingCartLists = data.result;
                                  this.shoppingCartListAdded.next(this.shoppingCartLists);   // shopping cart 추가후 변화한 값 적용하기
                              },
                              (error) => console.log(error)
                          );

      }
}

