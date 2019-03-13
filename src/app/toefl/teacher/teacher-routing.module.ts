
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../auth/auth.guard';

import { RegisterToeflComponent } from './register-toefl.component';
import { RegisterToeflStartComponent } from './register-toefl/register-toefl-start/register-toefl-start.component';
import { RegistToeflDetailComponent } from './register-toefl/regist-toefl-exam/regist-toefl-detail/regist-toefl-detail.component';
import { RegistToeflEditComponent } from '../teacher/register-toefl/regist-toefl-exam/regist-toefl-edit/regist-toefl-edit.component';

import { MakeExamStartComponent } from './register-toefl/make-toefl-exam/make-exam-start/make-exam-start.component';

import { ReadingExamComponent } from './register-toefl/make-toefl-exam/reading-exam/reading-exam.component';
import { EditReadingDescComponent } from './register-toefl/make-toefl-exam/reading-exam/edit-reading-desc/edit-reading-desc.component';
import { ReadingSection1Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section1/reading-section1.component';
import { ReadingSection2Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section2/reading-section2.component';
import { ReadingSection3Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section3/reading-section3.component';
import { ReadingSection4Component } from './register-toefl/make-toefl-exam/reading-exam/reading-section4/reading-section4.component';

import { ListeningExamComponent } from './register-toefl/make-toefl-exam/listening-exam/listening-exam.component';

const teacherRoutes: Routes = [
  { path: '', component: RegisterToeflComponent, children: [
      { path: '', component: RegisterToeflStartComponent, canActivate: [AuthGuard] },
      { path: 'new', component: RegistToeflEditComponent, canActivate: [AuthGuard]},       // 만일 순서를 지키지 않으면 params 에러가 발생할수 있음
      { path: ':id', component: RegistToeflDetailComponent, canActivate: [AuthGuard] },
      { path: ':id/edit', component: RegistToeflEditComponent, canActivate: [AuthGuard]},
      { path: ':id/makeexam', component: MakeExamStartComponent, canActivate: [AuthGuard]},
      { path: ':id/editReadingDesc', component: EditReadingDescComponent, canActivate: [AuthGuard]},
      { path: ':id/makeexam/reading', component: ReadingExamComponent, canActivate: [AuthGuard]},
      { path: ':id/makeexam/readingSection1', component: ReadingSection1Component, canActivate: [AuthGuard]},
      { path: ':id/makeexam/readingSection2', component: ReadingSection2Component, canActivate: [AuthGuard]},
      { path: ':id/makeexam/readingSection3', component: ReadingSection3Component, canActivate: [AuthGuard]},
      { path: ':id/makeexam/readingSection4', component: ReadingSection4Component, canActivate: [AuthGuard]}
  ]
}
];

@NgModule({
  imports: [
            RouterModule.forChild(teacherRoutes)
  ],
  exports: [RouterModule],
  providers: [ AuthGuard ],

})
export class TeacherRoutingModule {}
export const teacherRoutingComponents = [
                                          RegisterToeflComponent,
                                          RegisterToeflStartComponent,
                                          RegistToeflEditComponent,
                                          RegistToeflDetailComponent,
                                          MakeExamStartComponent,
                                          EditReadingDescComponent,
                                          ReadingExamComponent,
                                          ReadingSection1Component,
                                          ReadingSection2Component,
                                          ReadingSection3Component,
                                          ReadingSection4Component
                                        ];
