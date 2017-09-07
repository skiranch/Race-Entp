import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {AppSettings} from '../AppSettings';
@Injectable()

export class AppSettingsListService{
    private _headers;
    private _options;
    private _baseApiUrl = '/AppGenerationPortal/AGPServlet.svc/AppSettings';
    private _formatJson = '?&$format=json'
    constructor(private http: Http){
        this._headers = new Headers();
       
        /*this._headers.append("Access-Control-Allow-Credentials", "true");
        this._headers.append('Access-Control-Allow-Origin', '*');
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');*/
        this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this._headers.append('Authorization', 'bearer Y3VzdG9tZXIxOnBhc3N3b3Jk');
       // this._options = new RequestOptions();
       this._options = new RequestOptions( this._headers);

    }
    
    getDataSources(){
        return this.http.get(this._baseApiUrl)
                        .map(res => res.json().value)
    }
}

