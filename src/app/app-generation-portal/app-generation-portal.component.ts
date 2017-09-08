import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppSettings } from './AppSettings';
import { AppSettingsListService } from './services/AppSettingsList.service';
import { AppSettingsPostService } from './services/AppSettingsPost.service';

declare var jQuery: any;

@Component({
  selector: 'app-app-generation-portal',
  template: `
          <div class="content">
            <div class="row">
              <div class="col-md-12 content__header">
                  <div class="col-md-6">
                      <h1 class="content__header-text">App Settings</h1>
                  </div>
                  <div class="col-md-6">
                    <button type="button" class="button pull-right" data-toggle="modal" data-target="#createAppModal"><span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;App</button>
                  </div>
            </div>
            </div>

            <table class="table table-striped table-responsive table-sortable content__table">
              <thead>
                <tr>
                <th class="pointer">
                ProductName
                
              </th>
                  <th>Platform</th>
                  <th>Host Name</th>
                  <th>Port</th>
                  <th>Application Id</th>
                  <th>Security Type</th>
                  <th>Environment</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let appsetting of appsettings">
                    <td>{{appsetting.ProductName}} </td> <td>{{appsetting.Platform}}</td> <td>{{appsetting.HostName}}</td> <td>{{appsetting.Port}}</td> <td>{{appsetting.ApplicationId}}</td> <td>{{appsetting.SecurityType}}</td> <td>{{appsetting.Environment}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal fade" tabindex="-1" role="dialog" id="createAppModal">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
              <div class="modal-header">
                  <button type="button" routerLink="/app-generation-portal" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title bold">NEW SETTING</h4>
              </div>
              <div class="modal-body">
              <form #appSettingsForm="ngForm" (ngSubmit)="onSubmit(appSettingsForm)">
              <div class="tabs-wrap">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                  <a href="#connectionsettings" id="tabOne" aria-controls="connectionsettings" role="tab" data-toggle="tab" aria-expanded="true">Connection Settings</a>
                </li>
                <li>
                  <a href="#branding"  id="tabTwo"  aria-controls="branding" role="tab" data-toggle="tab" aria-expanded="false">Branding</a>
                </li>
                <li>
                  <a href="#othersettings"  id="tabThree" aria-controls="othersettings" role="tab" data-toggle="tab" aria-expanded="false">Other Settings</a>
                </li>
              </ul>
            
            <div class="tab-content">
            
              <div role="tabpanel" class="tab-pane active" id="connectionsettings">
                <div class="form-group">            
                      <div class="row modalControl_centercontent">
                                    <div class="col-md-3">
                                       <label for="email" class="modalControl_modalControlLabel">App Name</label>
                                    </div>
                                    <div class="col-md-9">
                                       <input type="text" #AppName class="form-control modalControl_inputtext" name="AppName" [ngModel]="AppName.value"  placeholder="App Name" autofocus="" >
                                    </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label for="Platform">Platform</label>
                                </div>
                                <div class="col-md-9">
                                <select class="form-control" #Platform name="Platform" [ngModel]="''">
                                  <option value=""></option>
                                  <option value="IOS">IOS</option>
                                  <option value="Andorid">Android</option>
                                </select>
                                </div>
                              </div>
                            </div>
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label for="HostName">Host Name</label>
                                </div>
                                <div class="col-md-9">
                                  <input  type="text"  #HostName name="HostName" [ngModel]="HostName.value"class="new-todo" class="form-control" placeholder="Host Name">
                                </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label for="portnumber">Port Number</label>
                                </div>
                                <div class="col-md-9">
                                  <input  type="text"  #Port name="Port" [ngModel]="Port.value" class="new-todo" class="form-control" placeholder="Port Number">
                                </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label for="applicationid">Application ID</label>
                                </div>
                                <div class="col-md-9">
                                  <input  type="text"  #ApplicationId name="ApplicationId" [ngModel]="ApplicationId.value" class="new-todo" class="form-control" placeholder="Application ID">
                                </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label for="SecurityType">SecurityType</label>
                                </div>
                                <div class="col-md-9">
                                  <select class="form-control" #SecurityType name="SecurityType" [ngModel]="''">
                                    <option value=""></option>
                                    <option value="saml">SAML</option>
                                    <option value="basic">BASIC</option>
                                    <option value="adsso">ADSSO</option>
                                    <option value="x509">X509</option>
                                  </select>
                                </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                  <div class="col-md-3">
                                    <label for="Environment">Environment</label>
                                  </div>
                                  <div class="col-md-9">
                                    <select class="form-control" #Environment name="Environment" [ngModel]="''">
                                    <option value=""></option>
                                    <option value="Development">Development</option>
                                    <option value="Quality">Quality</option>
                                    <option value="Production">Production</option>
                                    </select>
                                  </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                  <div class="col-md-3">
                                    <label for="Https">Https</label>
                                  </div>
                                  <div class="col-md-9">
                                    <input type="checkbox" #Https name="Https" [value]="Https.value" [ngModel]="Https.value"   placeholder="Https">
                                  </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                  <label for="SampleData">Sample Data</label>
                                </div>
                                <div class="col-md-9">
                                  <input type="checkbox" #SampleData name="SampleData" [value]="SampleData.value" [ngModel]="SampleData.value"  placeholder="Sample Data">
                                </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                              <div class="col-md-6">
                              <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Cancel</button>
                              </div>
                              <div class="col-md-6">
                              <a class="btn btn-primary Next" (click)="clickHighlighted('tabTwo')">Next</a>
                              </div>
                              </div>
                              </div>
              </div>
            
              <div role="tabpanel" class="tab-pane" id="branding">
              <div class="form-group">
                            <div class="row">
                              <div class="col-md-3">
                                  <label for="Logo">Select Logo</label><br/>
                              </div>
                              <div class="col-md-9">
                              <input #Logo name="Logo" [ngModel]="" type="file"  placeholder="Browse" (change)="imageUploadLogo($event)" accept="image/png"> 
                              </div>
                            </div>
                            </div>
                            <div class="form-group">
                            <div class="row">
                            <div class="col-md-3">
                              <label for="App Icon">App Icon</label><br/>
                            </div>
                            <div class="col-md-9">  
                              <input #AppIcon name="AppIcon" [ngModel]="" type="file" placeholder="Browse" (change)="imageUploadAppIcon($event)"> 
                            </div>
                            </div>
                            </div>
                            <div class="form-group">
                            <div class="row">
                                <div class="col-md-3">
                                  <label for="splashscreen">Splash Screen</label><br/>
                                </div>
                                <div class="col-md-9">
                                  <input  type="file" #SplashScreen name="SplashScreen" [ngModel]="" placeholder="Browse" (change)="imageUploadSplashScreen($event)"> 
                                </div>
                            </div>
                            </div>
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                    <label for="AppBackground">Splash Screen</label><br/>
                                </div>
                                <div class="col-md-9">
                                    <input  type="file" #AppBackground name="AppBackground" [ngModel]="" placeholder="Browse" (change)="imageUploadBackGround($event)"> 
                                </div>
                              </div>
                              </div>
                              <div class="form-group">
                              <div class="row">
                                <div class="col-md-3">
                                    <label for="theme">Theme</label>
                                </div>
                                <div class="col-md-9">
                                  <select #Theme name="Theme" [ngModel]="''" class="new-todo" class="form-control">
                                    <option value=""></option>
                                    <option value="#445566">Default Theme</option>
                                    <option value="#667755">Sample</option>
                                  </select>
                                </div>
                              </div>
                            <div class="row">
                              
                            </div>
                            </div>
                            <div class="form-group">
                          <div class="row">
                            <div class="col-md-3">
                                <label for="ShowDemoButton">Store Demo Button</label>
                            </div>
                            <div class="col-md-9">
                                <input type="checkbox" #ShowDemoButton [value]="ShowDemoButton.value" name="ShowDemoButton" [ngModel]="ShowDemoButton.value"  placeholder="Store Demo Button">
                            </div>
                          </div>
                          </div>
                          <div class="form-group">
                          <div class="row">
                          <div class="col-md-6">
                          <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Cancel</button>
                          </div>
                          <div class="col-md-6">
                          <a class="btn btn-primary Next" (click)="clickHighlighted('tabThree')">Next</a>
                          </div>
                          </div>
                          </div>
              </div>
            
              <div role="tabpanel" class="tab-pane" id="othersettings">
              <div class="form-group">
                        <div class="row">
                            <div class="col-md-3">
                                <label for="TimeOut">Time Duration</label>
                            </div>
                            <div class="col-md-9">
                                <select #TimeOut name="TimeOut" [ngModel]="''"  class="new-todo" class="form-control">
                                 <option value=""></option>
                                 <option value="20">D20</option>
                                 <option value="50">D50</option>
                                </select>
                            </div>
                          </div>
                          </div>
                          <div class="form-group">
                          <div class="row">
                           <div class="col-md-3">
                             <label for="languages">Languages</label>
                           </div>
                           <div class="col-md-9">
                              <select #Languages multiple name="Languages" [ngModel]="''"  class="new-todo" class="form-control">
                                <option value=""></option>
                                <option value="English">English</option>
                                <option value="Japanese">Japanese</option>
                              </select>
                           </div>
                          </div>
                          </div>
                          <div class="form-group">
                          <div class="row">
                            <div class="col-md-3">
                                <label for="AppPassCode">App Pass Code</label>
                            </div>
                            <div class="col-md-9">
                                <input type="checkbox" #AppPassCode name="AppPassCode" [value]="AppPassCode.value" [ngModel]="AppPassCode.value" placeholder="App Pass Code">
                            </div>
                          </div>
                          </div>
                          <div class="form-group">
                          <div class="row">
                              <div class="col-md-3">
                                  <label for="TouchId">Touch ID</label>
                              </div>
                              <div class="col-md-9">
                                <input type="checkbox" #TouchId name="TouchId" [value]="TouchId.value" [ngModel]="TouchId.value"  placeholder="Touch ID">
                              </div>
                          </div>
                          </div>
                          <div class="form-group">
                          <div class="row">
                              <div class="col-md-3">
                                <label for="Website URL">Website URL</label>
                              </div>
                              <div class="col-md-9">
                                <input  type="text"  #WhiteListUrl name="WhiteListUrl" [ngModel]="WhiteListUrl.value" class="new-todo" class="form-control" placeholder="Website URL">
                              </div>
                          </div>
                          </div>
                          <div class="form-group">
                          <div class="row">
                           <div class="col-md-3">                        
                             <button type="button" class="btn btn-primary pull-right" data-dismiss="modal">Cancel</button>
                          </div>
                          <div class="col-md-9">
                            <button type="submit"  class="btn btn-primary Next">Submit</button>
                          </div>
                          </div>
                        </div>
              </div>
            </div>
            
            </div>
                  </form>
              </div>
              
              </div>
          </div>
          
          </div>
`,
  styleUrls: ['./app-generation-portal.component.scss', '../../assets/scss/_buttons.scss'],
  providers: [AppSettingsListService, AppSettingsPostService],

})
export class AppGenerationPortalComponent implements OnInit {
  public appsettings: AppSettings[] = [];
  private postData;
  constructor(private _getDataService: AppSettingsListService, private _appsettingsPostService: AppSettingsPostService) { }
  ngOnInit() {
   this.getData();
   // this.PostSettings();
  }
  getData() {
    this._getDataService.getDataSources()
      .subscribe(
      appsettings => this.appsettings = appsettings,
      error => console.log(error));
  }
  PostSettings() {
    this._appsettingsPostService.doPost(this.appSettingPayload)
      .subscribe(
      data => this.postData = data,
      error => console.log(error),
      () => {
        this.getData();
        //console.log(this.postData)
      }
      )
  }
  //post request 1
  appSettingPayload = {
    "AppsettingsId": "AppSId2",
    "CustomerId": "customer1",
    "ProductCode": "ProductA",
    "ProductName": "ProuductA",
    "Platform": "",
    "HostName": "smpprd.innovapptive.com",
    "Port": "30015",
    "ApplicationId": "com.proudct.innovapptive",
    "Https": true,
    "SampleData": true,
    "AppName": "Demo",
    "SecurityType": "SSO2",
    "Environment": "Unix",
    "Logo": "",
    "AppIcon": "",
    "SplashScreen": "",
    "AppBackground": "",
    "Theme": "green",
    "StoreName": "store1",
    "ShowDemoButton": true,
    "AppPassCode": true,
    "TouchId": true,
    "TimeOut": "5",
    "Languages": "{id:1,key:E,value:English}",
    "WhiteListUrl": "[{ApplicationID: com.innovapptive.cc.race,StoreName:RACE},{{ApplicationID: com.innovapptive.cc.race1,StoreName:RACE1}}]",
    "BuildNo": 1,
    "BuildLink": "",
    "CreatedOn": "",
    "CreatedBy": "Sunil",
    "Modified": "",
    "Settings": ""
  }
 
  onSubmit(form: NgForm) {
    //this is a hack for the demo purpose
    this.appSettingPayload.AppName = form.value.AppName;
    this.appSettingPayload.Platform = form.value.Platform;
    this.appSettingPayload.HostName = form.value.HostName;
    this.appSettingPayload.Port = form.value.Port;
    this.appSettingPayload.ApplicationId = form.value.ApplicationId;
    this.appSettingPayload.Environment= form.value.Environment;
    //this.appSettingPayload.Https = form.value.Https;
    //this.appSettingPayload.SampleData = form.value.SampleData;
    /* this.appSettingPayload.Logo="";
     this.appSettingPayload.AppIcon="";
     this.appSettingPayload.SplashScreen="";*/
    this.appSettingPayload.Theme = form.value.Theme;
    //this.appSettingPayload.StoreName = form.value.StoreName;
    //this.appSettingPayload.ShowDemoButton = form.value.ShowDemoButton;
    this.appSettingPayload.TimeOut = form.value.TimeOut;
    this.appSettingPayload.Languages = form.value.Languages;
    //this.appSettingPayload.AppPassCode = form.value.AppPassCode;
    //this.appSettingPayload.TouchId = form.value.TouchId;
    this.appSettingPayload.WhiteListUrl = form.value.WhiteListUrl;

    console.log(this.appSettingPayload);
    //Calls
   this.PostSettings();
  }
  imageUploadLogo(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    let baseval = "";
    reader.onloadend = () => {
      let base64val = reader.result;
      baseval = base64val.substring(base64val.indexOf("base64,") + 7);
      this.appSettingPayload.Logo = baseval;
      //console.log(baseval);
    }
    reader.readAsDataURL(file);
  }
  imageUploadAppIcon(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    let baseval = "";
    reader.onloadend = () => {
      let base64val = reader.result;
      baseval = base64val.substring(base64val.indexOf("base64,") + 7);
      this.appSettingPayload.AppIcon = baseval;
      //console.log(baseval);
    }
    reader.readAsDataURL(file);
  }
  imageUploadSplashScreen(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    let baseval = "";
    reader.onloadend = () => {
      let base64val = reader.result;
      baseval = base64val.substring(base64val.indexOf("base64,") + 7);
      this.appSettingPayload.SplashScreen = baseval;
      //console.log(baseval);
    }
    reader.readAsDataURL(file);
  }
  imageUploadBackGround(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    let baseval = "";
    reader.onloadend = () => {
      let base64val = reader.result;
      baseval = base64val.substring(base64val.indexOf("base64,") + 7);
      this.appSettingPayload.AppBackground = baseval;
      //console.log(baseval);
    }
    reader.readAsDataURL(file);
  }

  clickHighlighted(id){
    jQuery("#"+id).click();
  }
}
