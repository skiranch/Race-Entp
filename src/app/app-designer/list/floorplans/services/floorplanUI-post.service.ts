import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { API } from './api.conf';

@Injectable()
export class FloorplanUIPostService {
    private _headers;
    private _headers2;

    private _options;

    private _baseApiUrl = API.baseUrl+'/FPConfigCollection';
    constructor(private http: Http) {
        this._headers = new Headers();
        this._headers2 = new Headers();

        this._headers.append("x-csrf-token", "fetch");
        this._headers2.append("Content-Type", "application/json");
        this._options = new RequestOptions();
        this._options = new RequestOptions({ headers: new Headers(this._headers) });

    }

    getTokenData() {
        return this.http.get(
            this._baseApiUrl, this._options
        ).map(
                res => res.headers.get('x-csrf-token')
            )
    }

    doPost($obj1, token) {
        // console.log('posting... from doPOst')
        console.log('posting now...');
        this._headers2.delete("x-csrf-token");
        this._headers2.append("x-csrf-token", token);
        return this.http.post(this._baseApiUrl, $obj1, {
            headers: this._headers2
        }).map(res => {
                res.status
                    if (res.status === 201) {
                        console.log("1: Configuration saved successfully!!")
                    }
                }
            )
        //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

   
}

