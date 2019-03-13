// angular module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// MDBootstrap Module
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

// 사용자 정의 pipe
import { ShortenPipe1 } from '../../shared/pipe-collection/shorten.pipe.1';
// 라우팅 모듈
import { TeacherRoutingModule, teacherRoutingComponents } from './teacher-routing.module';
// 공유 모듈
import { SharedModule } from '../../shared/shared.module';
// teacher Nav Menu Component 모듈
import { TeacherNavHeaderComponent } from './teacher-navigation/teacher-nav-header/teacher-nav-header.component';
import { TeacherSidebarComponent } from './teacher-navigation/teacher-sidebar/teacher-sidebar.component';

// 필요 서비스 모듈
import { RegisterToeflService } from './teacher.service';
import { MakeExamService } from '../teacher/register-toefl/make-toefl-exam/makeexam.service';
import { ReadingService } from './register-toefl/make-toefl-exam/reading-exam/reading.service';

// 사용자 정의 editor 모듈
import { TonyEditorComponent } from '../../tony-editorv1.0.0/tony-editor/tony-editor.component';
import { TonyEditorToolbarComponent } from '../../tony-editorv1.0.0/tony-editor.toolbar/tony-editor.toolbar.component';
import { ExecutableCommandService } from '../../tony-editorv1.0.0/services/executable-command.service';

// 사용자 정의 stepper모듈
import { StepperComponent } from './stepper/stepper.component';

// 라우팅에는 없지만 directive로 구현된 components
import { RegistToeflListComponent } from './register-toefl/regist-toefl-exam/regist-toefl-list/regist-toefl-list.component';
import { RegistItemComponent } from './register-toefl/regist-toefl-exam/regist-toefl-list/regist-item/regist-item.component';

// 아직 안만들어진 components
import { ReadingExamComponent } from './register-toefl/make-toefl-exam/reading-exam/reading-exam.component';
import { ReadingProblemsComponent } from './register-toefl/make-toefl-exam/reading-exam/reading-problems/reading-problems.component';
import { ListeningExamComponent } from './register-toefl/make-toefl-exam/listening-exam/listening-exam.component';
import { WritingExamComponent } from './register-toefl/make-toefl-exam/writing-exam/writing-exam.component';
import { SpeakingExamComponent } from './register-toefl/make-toefl-exam/speaking-exam/speaking-exam.component';


@NgModule({
  declarations: [
    teacherRoutingComponents,
    RegistToeflListComponent,
    RegistItemComponent,
    TeacherNavHeaderComponent,
    TeacherSidebarComponent,
    ReadingExamComponent,
    ListeningExamComponent,
    WritingExamComponent,
    SpeakingExamComponent,
    TonyEditorComponent,
    TonyEditorToolbarComponent,
    ReadingProblemsComponent,
    StepperComponent,
    ShortenPipe1
  ],
  imports: [
    CommonModule,
    SharedModule,
    MDBBootstrapModulesPro.forRoot(),
    TeacherRoutingModule
  ],
  providers: [ RegisterToeflService, MakeExamService, ExecutableCommandService, ReadingService ]
})
export class ToeflTeacherModule {}
