import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { API } from './api.conf';

@Injectable()

export class DataSourceService{
    private _headers;
    private _options;
    private _baseApiUrl = API.baseUrl+API.dataSourceCollection+API.formatJson;;
    
    constructor(private http: Http){
        
    }
    
    getDataSources(){

        this._headers = new Headers();
        //this._headers.append('Authorization', 'Basic Y3JhbzpkYW1vZGhhcg==');
        this._headers.append("access-control-allow-credentials",  true);
        this._headers.append("access-control-allow-headers",  "X-Csrf-Token, x-csrf-token, x-sap-cid, Content-Type, Authorization");
        this._headers.append("access-control-allow-methods",  "GET, POST, PUT, OPTIONS");
        this._headers.append('Authorization', "Basic " +  btoa("race1:innovation"));
        this._headers.append("Content-Type", "application/x-www-form-urlencoded");
        this._headers.append('Access-Control-Allow-Origin', '*');
        
        this._options = new RequestOptions();
        this._options = new RequestOptions({ headers: new Headers(this._headers) });
        console.log(this._options)
        
        return this.http.get(this._baseApiUrl, this._options)
                        .map(res => res.json())
    }
}

