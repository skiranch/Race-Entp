import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class CPDPPostService {
    private _headers;
    private _headers2;

    private _options;

    private _baseApiUrl = '/sap/opu/odata/INVAPI/RACE_API_SRV/DataProvidersCollection';
    constructor(private http: Http) {
        this._headers = new Headers();
        this._headers2 = new Headers();

        //this._headers.append('Authorization', 'Basic cmFjZTE6aW5ub3ZhdGlvbg==');
        //this._headers.append("Access-Control-Allow-Credentials", "true");
        this._headers.append("x-csrf-token", "fetch");
        this._headers2.append("Content-Type", "application/json");
        //this._headers.append('Access-Control-Allow-Origin','http://localhost:4200');
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

    doPost1($obj1, token) {
        // console.log('posting... from doPOst')
        console.log('1: posting now...');
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

    doPost2($obj2, token) {
        // console.log('posting... from doPOst')
        console.log('2: posting now...');
        this._headers2.delete("x-csrf-token");
        this._headers2.append("x-csrf-token", token);
        return this.http.post(this._baseApiUrl, $obj2, {
            headers: this._headers2
        }).map(res => {
                // res.status
                    if (res.status === 201) {
                        console.log("2: Configuration saved successfully!!")
                    }
                }
            )
    }

    doPost3($obj3, token) {
        // console.log('posting... from doPOst')
        console.log('3: posting now...');
        this._headers2.delete("x-csrf-token");
        this._headers2.append("x-csrf-token", token);
        return this.http.post(this._baseApiUrl, $obj3, {
            headers: this._headers2
        }).map(res => {
                // res.status
                    if (res.status === 201) {
                        console.log("3: Configuration saved successfully!!")
                    }
                }
            )
    }
}

