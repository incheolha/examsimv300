
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToeflExamRoutingModule, toeflExamRoutingComponents } from './toefl-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { ToeflExamService } from './toeflexam.service';

@NgModule({
  declarations: [
    toeflExamRoutingComponents
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToeflExamRoutingModule
  ],
  providers: [ ToeflExamService ]
})
export class ToeflExamModule {}
