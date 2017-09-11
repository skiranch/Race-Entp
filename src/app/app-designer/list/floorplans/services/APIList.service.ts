import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { API } from './api.conf';

@Injectable()

export class APIListService{
    private _headers;
    private _options;
    private _baseApiUrl = API.baseUrl+'/APIListCollection?$filter=APIName%20eq%20%27';
    //inputval
    private _urlPart1 = '*%27%20and%20DataSource%20eq%20%27';
    //SAP
    private _urlPart2 = '%27%20and%20ConnectionProvider%20eq%20%27';
    //ERD
    private _urlPart3 = '%27&$format=json'
    constructor(private http: Http){
        this._headers = new Headers();
        this._headers.append('Authorization', 'Basic cmFjZTE6aW5ub3ZhdGlvbg==');
        this._headers.append("Access-Control-Allow-Credentials", "true");
        this._headers.append('Access-Control-Allow-Origin','http://localhost:4200');
        //this._options = new RequestOptions();
        //this._options = new RequestOptions({ headers: new Headers(this._headers) });
    }
    
    getApiList($apival, $systemId, $cpname){
        console.log('url called: '+this._baseApiUrl+$apival+this._urlPart1+$systemId+this._urlPart2+$cpname+this._urlPart3)
        return this.http.get(this._baseApiUrl+$apival+this._urlPart1+$systemId+this._urlPart2+$cpname+this._urlPart3, {headers: this._headers})
                        .map(res => res.json())
    }
}

