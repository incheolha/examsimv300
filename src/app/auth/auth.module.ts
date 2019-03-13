// angular module
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// MDBootstrap module
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

// Google AGM Map 사용하기
import { AgmCoreModule } from '@agm/core';

// authRoutingMOdule
import { AuthRoutingModule, authRoutingComponents } from './auth-routing.module';
// 제 3자가 제공한 toaster module
import { ToastModule } from 'ng-uikit-pro-standard';
// 모든 component module에서 공통으로 사용하는 모들
import { SharedModule } from './../shared/shared.module';

// 컴포넌트는 만들어 졌으나 아직 코딩이 안된 모듈
import { EditUserProfileComponent } from './profile/profile-edit/edit-user-profile/edit-user-profile.component';
import { ExamHistoryComponent } from './profile/profile-edit/exam-history/exam-history.component';
import { ExamAnalysisComponent } from './profile/profile-edit/exam-analysis/exam-analysis.component';
import { ProfileOrderHistoryComponent } from './profile/profile-edit/profile-order-history/profile-order-history.component';

@NgModule({
  declarations: [
                  authRoutingComponents,
                  EditUserProfileComponent,
                  ExamHistoryComponent,
                  ExamAnalysisComponent,
                  ProfileOrderHistoryComponent
                ],
  imports: [
            CommonModule,
            SharedModule,
            MDBBootstrapModulesPro.forRoot(),
            ToastModule.forRoot(),
            AgmCoreModule.forRoot({
              apiKey: 'AIzaSyCwMYILY491pwQdKQzCV8XfFT1O0E3aYFo'
            }),
            AuthRoutingModule
  ]
})
export class AuthModule {}
