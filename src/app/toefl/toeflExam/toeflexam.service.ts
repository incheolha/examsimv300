import { GlobalConstantShare } from '../../Utility-shared/globalConstantShare';

import { Toefl } from './../models/toefl.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ToeflExamService {

  loginStatusChecked = false;
  urlConfig = GlobalConstantShare.httpUrl;  // 실제 url 주소가 있는곳
  private toefls: Toefl[] = [];
  public toeflListChanged = new Subject<Toefl[]>();
  constructor(private http: HttpClient)  {}

  getAllToeflLists() {

    this.http.get<{ message: string, toefls: Toefl[] }>(this.urlConfig + '/showExam/')
                  .subscribe((postToefls) => {
                                                this.toefls = postToefls.toefls;
                                                this.toeflListChanged.next([...this.toefls]);
                                              },
                                                (error) => console.log(error)
                );
  }

}


