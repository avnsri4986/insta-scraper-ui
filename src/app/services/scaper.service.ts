import { Subject } from 'rxjs/Subject';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConstantsService } from './constants.services'
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';
@Injectable()
export class ScraperService {
    constructor(private http: Http, public constantsService: ConstantsService) {
    }
    getUserdata(username): Observable<Object> {
        var scraper_url = `/instagram/${username}`;
        return this.http.get(scraper_url)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw(err));
    }
    getQueryUrlData(queryUrls): Observable<Object> {
        var scraper_url = '/instagram/query_next',
        headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post(scraper_url, JSON.stringify(queryUrls), {headers: headers})
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw(err));
    }
}