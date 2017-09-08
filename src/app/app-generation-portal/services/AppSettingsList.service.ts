import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {AppSettings} from '../AppSettings';
@Injectable()

export class AppSettingsListService{
    private _headers;
    private _options;
    private _baseApiUrl = 'https://appgenerationportalb70068d2c.us1.hana.ondemand.com/AppGenerationPortal/AGPServlet.svc/AppSettings';
    private _formatJson = '?&$format=json'
    constructor(private http: Http){
        this._headers = new Headers();
       
        this._headers.append("Access-Control-Allow-Credentials", "true");
        this._headers.append('Access-Control-Allow-Origin', '*');
        this._headers.append('Content-Type', 'application/json');
        this._headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this._headers.append('Authorization', "Basic " +  btoa("customer1:password"));
       // this._options = new RequestOptions();
       this._options = new RequestOptions({ method: RequestMethod.Get, headers: this._headers });

    }
    
    getDataSources(){
        console.log(this._options);
        return this.http.get(this._baseApiUrl,this._options)
                        .map(res => res.json().value)
    }
}

