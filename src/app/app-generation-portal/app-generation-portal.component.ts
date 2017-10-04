import { Component, OnInit,Input, ElementRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppSettings } from './AppSettings';
import { AppSettingsListService } from './services/AppSettingsList.service';
import { AppSettingsPostService } from './services/AppSettingsPost.service';
import { NgFor } from '@angular/common';

declare var jQuery: any;

@Component({
  selector: 'app-app-generation-portal',
  templateUrl:'./app-generation-portal.component.html',
  styleUrls: ['./app-generation-portal.component.scss', '../../assets/scss/_buttons.scss'],
  providers: [AppSettingsListService, AppSettingsPostService],
  host: {
    '(document:click)': 'handleClick($event)',
},

})
export class AppGenerationPortalComponent implements OnInit {

  isDesc: boolean = false;
  column: string = 'ProductName';
  direction: number;

  public appsettings: AppSettings[] = [];
  private postData;
  public whiteListUrls=[{id:'ch1',url:'sam',storename:'sam'}];
  public AllLanguages=[{"id":1,"key":"E","value":"English"},{"id":2,"key":"D","value":"German"},{"id":3,"key":"F","value":"French"},{"id":4,"key":"S","value":"Spanish"},{"id":5,"key":"P","value":"Portuguese"},{"id":6,"key":"1","value":"Chinese"}];
  urls:string="[";
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
    "Theme": "",
    "StoreName": "store1",
    "ShowDemoButton": true,
    "AppPassCode": true,
    "TouchId": true,
    "TimeOut": "5",
    "Languages": "{id:1,key:E,value:English}",
    "WhiteListUrl": "[{ApplicationID: com.innovapptive.cc.race,StoreName:RACE},{ApplicationID: com.innovapptive.cc.race1,StoreName:RACE1}]",
    "BuildNo": 1,
    "BuildLink": "",
    "CreatedOn": "",
    "CreatedBy": "Sunil",
    "Modified": "",
    "Settings": ""
  }
  constructor(private _getDataService: AppSettingsListService, private _appsettingsPostService: AppSettingsPostService,public myElement: ElementRef) {this.elementRef = myElement;}
  ngOnInit() {
    this.getData();
   this.sort(this.column);
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
    this.appSettingPayload.Languages = this.appSettingPayload.Languages.toString();
    this.appSettingPayload.StoreName=form.value.StoreName;
    //this.appSettingPayload.AppPassCode = form.value.AppPassCode;
    //this.appSettingPayload.TouchId = form.value.TouchId;
    //this.appSettingPayload.WhiteListUrl = this.appSettingPayload.WhiteListUrl.toString();
   
    for(var i=0;i<this.whiteListUrls.length;i++){
      var strid:string="{id:"+(i+1)+",";
      var a =this.whiteListUrls[i].url;
      var b=this.whiteListUrls[i].storename;
      var res="";
      if(i!=(this.whiteListUrls.length-1)){
      res = strid+"\"ApplicationID\":\""+a+"\","+"\"StoreName\":\""+b+"\"},";
      }else{
        res = strid+",\"ApplicationID\":\""+a+"\","+"\"StoreName\":\""+b+"\"}]";
      }
      this.urls += res;
    //console.log(this.whiteListUrls[i])
  }
  //console.log(this.urls);
  this.appSettingPayload.WhiteListUrl =this.urls;
  //based on selected languages need to do formatting which accepts service
  var selectedLanguagesPayload:string="[";
  //console.log(this.appSettingPayload.Languages);
  var selectedLanguages:string[] = this.appSettingPayload.Languages.split(",");
  for(var j=0;j<selectedLanguages.length;j++){
    var element_languages = selectedLanguages[j];
    var objLanugage = this.AllLanguages[element_languages];
    var id=j+1;
    var key = objLanugage.key;
    var value=objLanugage.value;
    var langVals:string="{id:"+id+",key:"+"\""+key+"\",value:\""+value+"\"},";
    if(id ==  selectedLanguages.length)
      langVals="{id:"+id+",key:"+"\""+key+"\",value:\""+value+"\"}]";
    selectedLanguagesPayload += langVals;
  }
  this.appSettingPayload.Languages = selectedLanguagesPayload;
//console.log(selectedLanguagesPayload);
//console.log(this.appSettingPayload);
    //Calls
   this.PostSettings();
   
   //reset all the binding fields
   this.resetForm();
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
  addNew(){
    let num = this.whiteListUrls.length+1;
    this.whiteListUrls.push({id:'ch'+num,url:'',storename:''});
  }
  remove(){
    //check wether the array contains one element
    let lastitem = this.whiteListUrls.length;
    console.log("lastitem:"+lastitem);
    if(lastitem>1)
    this.whiteListUrls.splice(lastitem-1);
  }
  resetForm(){
    jQuery("#createAppModal").click();
    /*this.appSettingPayload.AppBackground="";
    this.appSettingPayload.AppIcon="";
    this.appSettingPayload.ApplicationId="";
    this.appSettingPayload.AppName="";
    this.appSettingPayload.AppPassCode=false;
    this.appSettingPayload.AppsettingsId="";
    this.appSettingPayload.BuildLink="";
    this.appSettingPayload.BuildNo=0;
    this.appSettingPayload.CreatedBy="";
    this.appSettingPayload.CreatedOn="";
    this.appSettingPayload.CustomerId="";
    this.appSettingPayload.Environment="";
    this.appSettingPayload.HostName="";
    this.appSettingPayload.Https=false;
    this.appSettingPayload.Languages="";
    this.appSettingPayload.Logo="";
    this.appSettingPayload.Modified="";
    this.appSettingPayload.Platform="";
    this.appSettingPayload.Platform="";
    this.appSettingPayload.Port="";
    this.appSettingPayload.ProductCode="";
    this.appSettingPayload.ProductName="";
    this.appSettingPayload.SampleData=false;
    this.appSettingPayload.SecurityType="";
    this.appSettingPayload.Settings="";
    this.appSettingPayload.ShowDemoButton=false;
    this.appSettingPayload.SplashScreen="";
    this.appSettingPayload.StoreName="";
    this.appSettingPayload.Theme="";
    this.appSettingPayload.TimeOut="";
    this.appSettingPayload.TouchId=false;
    this.appSettingPayload.WhiteListUrl="";*/
   }
   sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };
  public query = '';
  public languages = [ "chinese","spanish","English","Hindi","Arabic","Portuguese","Russian","Japanese", "French",
                      ];
  public filteredList = [];
  public elementRef;
  public selected=[];

 
  filter() {
    if (this.query !== ""){
        this.filteredList = this.languages.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}
 
select(item){
  this.selected.push(item);
  this.query = '';
  this.filteredList = [];
}
removing(item){
this.selected.splice(this.selected.indexOf(item),1);
}
    
    handleClick(event){
      var clickedComponent = event.target;
      var inside = false;
      do {
          if (clickedComponent === this.elementRef.nativeElement) {
              inside = true;
          }
         clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
       if(!inside){
           this.filteredList = [];
       }
   }

    
  }

