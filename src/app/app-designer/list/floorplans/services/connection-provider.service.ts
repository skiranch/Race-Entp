import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()

export class ConnectionProviderService{
    private _headers;
    private _options;
    private _baseApiUrl = '/sap/opu/odata/INVAPI/RACE_API_SRV/ConnectionProvidersCollection?$filter=DataSource%20eq%20%27';
    private _urlPart = '%27&$format=json';
    constructor(private http: Http){
        this._headers = new Headers();
        this._headers.append('Authorization', 'Basic cmFjZTE6aW5ub3ZhdGlvbg==');
        this._headers.append("Access-Control-Allow-Credentials", "true");
        this._headers.append('Access-Control-Allow-Origin','http://localhost:4200');
        //this._options = new RequestOptions();
        //this._options = new RequestOptions({ headers: new Headers(this._headers) });
    }
    
    getConnectionProviders($filterId){
        console.log('url called: '+this._baseApiUrl+$filterId+this._urlPart)
        return this.http.get(this._baseApiUrl+$filterId+this._urlPart, {headers: this._headers})
                        .map(res => res.json())
    }
}

