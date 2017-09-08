import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../AppSettings';
import 'rxjs/Rx';

@Injectable()
export class AppSettingsPostService{
    private _headers;
    private _options;
    private _baseApiUrl = 'https://appgenerationportalb70068d2c.us1.hana.ondemand.com/AppGenerationPortal/AGPServlet.svc/AppSettings';
    constructor(private http: Http){
        this._headers = new Headers();        
       this._headers.append("Access-Control-Allow-Credentials", "true");
       this._headers.append('Access-Control-Allow-Origin','*');
       this._headers.append('Content-Type', 'application/json');
       this._headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
       //this._headers.append('Content-Type', 'application/x-www-form-urlencoded');
       this._headers.append('Authorization', "Basic " +  btoa("customer1:password"));
        //this._options = new RequestOptions();
        this._options = new RequestOptions({ method: RequestMethod.Post, headers: this._headers });
        //,{headers:this._options}
    }
   doPost($obj1):Observable<Response>{
        // console.log('posting... from doPOst')
         //console.log(JSON.stringify($obj1));
            return this.http.post(this._baseApiUrl, JSON.stringify($obj1),this._options).map((res:Response) => {
            {
                res.json();
            }
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }
}

