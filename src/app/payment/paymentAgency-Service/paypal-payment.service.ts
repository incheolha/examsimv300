import { GlobalConstantShare } from '../../Utility-shared/globalConstantShare';

import { ShoppingcartService } from './../shoppingcart.service';
import { Payment } from './../model/payment.model';
import { Injectable, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService_Local } from '../../auth/auth.service';

@Injectable()
export class PaypalPaymentService {

    payment: Payment;
    urlConfig = GlobalConstantShare.httpUrl;     // url 실제 주소가 있는곳
    constructor(private http: Http,
                private authService: AuthService_Local,
                private shoppingCartService: ShoppingcartService) {}


    checkoutPaypal(payment: Payment) {

      console.log('paypal click');

        const body = JSON.stringify(payment);

        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.urlConfig + '/paypal/createPayment', body, {headers: headers})
                        .subscribe(data => {
                            const paymentUrl = data.json();
                            console.log(paymentUrl.url);
                            window.location.href = paymentUrl.url;
                        }),
                        (error) => this.handleErrors(error);
    }

    getPaypalResult() {
        const token = localStorage.getItem('token');
        const header = new Headers({'Content-type': 'application/json'});
        return this.http.get(this.urlConfig + '/paypal/paymentResult/' + '?token=' + token, {headers: header})
                    .subscribe(
                        (res: Response) => {
                            const data = res.json();
                            // tslint:disable-next-line:max-line-length
                            const reInitSuccess = this.shoppingCartService.reInitialShoppingCartLists(data.payPalResult, data.paypalUserInfo);
                        }
                    );
    }

    handleErrors(error: Response) {
        const err = error.json();
        console.log(err);
        return Observable.throw(error);
    }
}
