import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from '../shared/restConfig';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FeedbackService {

    constructor(private restangular: Restangular,
        private processHTTPMsgService: ProcessHTTPMsgService) { }

    submitFeedback(newFeedback: Feedback): Observable<Feedback>{
        return this.restangular.all('feedback').post(newFeedback);
    }



}
