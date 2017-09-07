import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers,RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from '../AppSettings';
import 'rxjs/Rx';

@Injectable()
export class AppSettingsPostService{
    private _headers;
    private _options;
    private _baseApiUrl = '/AppGenerationPortal/AGPServlet.svc/AppSettings';
    constructor(private http: Http){
        this._headers = new Headers();        
       // this._headers.append("Access-Control-Allow-Credentials", "true");
        //this._headers.append('Authorization', 'Basic Y3VzdG9tZXIxOnBhc3N3b3Jk');
        //this._headers.append("x-csrf-token", "Fetch");
       this._headers.append("Content-Type","application/json; odata.metadata=minimal");
      // this._headers.append("Access-Control-Allow-Method","POST");
       //this._headers.append("Access-Control-Allow-Headers","content-type,authorization,access-control-allow-headers,access-control-allow-method,content-type");
      // this._headers.append("Access-Control-Allow-Methods","POST");
        //this._headers.append("Accept", "*/*");
      //  this._headers.append('Access-Control-Allow-Origin','http://localhost:4200');
        //this._options = new RequestOptions();
        this._options = new RequestOptions({headers: this._headers });
        //,{headers:this._options}
    }
   doPost($obj1):Observable<Response>{
        // console.log('posting... from doPOst')
         //console.log(JSON.stringify($obj1));
            return this.http.post(this._baseApiUrl, JSON.stringify($obj1),{headers:this._headers}).map((res:Response) => {
            {
                console.log("status:"+res.json());
                res.json();
                
            }
               
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }
}

