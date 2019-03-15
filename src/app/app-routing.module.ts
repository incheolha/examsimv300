// angular module
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// header side footer component
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FooterComponent } from './navigation/footer/footer.component';

// page not found 관련 component

import { NotFoundComponent } from './not-found/not-found.component';

// 각종 pipe 규정
import { ShortenPipe } from './shared/pipe-collection/shorten.pipe';

// MDTabset으로 구성된 components
import { ToeflListComponent } from './toefl/toeflExam/toefl-list/toefl-list.component';
import { BasicToeflListComponent } from './toefl/toeflExam/basic-toefl-list/basic-toefl-list.component';
import { IntermediateToeflListComponent } from './toefl/toeflExam/intermediate-toefl-list/intermediate-toefl-list.component';
import { AdvanceToeflListComponent } from './toefl/toeflExam/advance-toefl-list/advance-toefl-list.component';
import { BeginnerToeflListComponent } from './toefl/toeflExam/beginner-toefl-list/beginner-toefl-list.component';
import { EventToeflListComponent } from './toefl/toeflExam/event-toefl-list/event-toefl-list.component';

// payment module 관련 component -- RouterModule.forChild는 한개박에 작동이 안되므로
// auth module애 forChild모드를 적용하면 payment module이 적용이 되지만 page-not-found가 작동 안됨
import { PaymentComponent } from './payment/payment.component';
import { ShoppingcartComponent } from './payment/shoppingcart/shoppingcart.component';
import { PaymentProceedComponent } from './payment/payment-checkout/payment-proceed/payment-proceed.component';
import { PaymentNotificationComponent } from './payment/payment-checkout/payment-notification/payment-notification.component';
import { OrderSummaryComponent } from './payment/shoppingcart/order-summary/order-summary.component';
import { PaymentOrderSummaryComponent } from './payment/payment-checkout/payment-order-summary/payment-order-summary.component';

// 주소창에 아무거나 입력하면 무조건 auth.guard를 작동하여 인증모드로 강제로 forward하는 기능
import { AuthGuard } from './auth/auth.guard';

const APP_ROUTES: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full'},
   { path: 'home', component: WelcomeComponent  },
   { path: 'payment', component: PaymentComponent, children: [
                      {path: 'shoppingcart', component: ShoppingcartComponent, canActivate: [AuthGuard]},
                      {path: 'checkout/:totalAmount', component: PaymentProceedComponent, canActivate: [AuthGuard]},
                      {path: 'result', component: PaymentNotificationComponent}
                  ]
   },
   { path: 'teacher', loadChildren: './toefl/teacher/teacher.module#ToeflTeacherModule'},
   { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES,
                                  {
                                    preloadingStrategy: PreloadAllModules
                                  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const appRoutingComponent = [

                                    WelcomeComponent,
                                    HeaderComponent,
                                    SidenavListComponent,
                                    EventToeflListComponent,

                                    ToeflListComponent,
                                    BeginnerToeflListComponent,
                                    BasicToeflListComponent,
                                    IntermediateToeflListComponent,
                                    AdvanceToeflListComponent,
                                    FooterComponent,

                                    ShortenPipe,

                                    NotFoundComponent,
                                    PaymentComponent,
                                    ShoppingcartComponent,
                                    PaymentProceedComponent,
                                    PaymentNotificationComponent,
                                    OrderSummaryComponent,
                                    PaymentOrderSummaryComponent,

                                   ];
