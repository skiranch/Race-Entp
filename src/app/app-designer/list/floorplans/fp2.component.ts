import { Component, NgModule, TemplateRef  } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON }  from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

// services
import { DataSourceService } from './services/data-source.service'
import { ConnectionProviderService } from './services/connection-provider.service'
import { APIListService } from './services/APIList.service'
import { ListOfFieldsService } from './services/listOfFields.service'
import { CPDPPostService } from './services/CPDP-post.service'
import { FloorplanUIPostService } from './services/floorplanUI-post.service'


declare var jQuery: any;

@Component({
  template: `
  <div class="frame">
    <span class="frame__prev glyphicon glyphicon-triangle-right" (click)="gotToNextScreen()">Next</span>
    <span class="frame__next glyphicon glyphicon-triangle-left" (click)="gotToPreviousScreen()">Prev</span>
    <a href="javascript:void(0)" class="legend" (click)="showProperties()">Properties</a>
        <div class="floorplan">
            <header class="floorplan__header" [ngStyle]="{'background': headerColor.value }">
                <div class="floorplan__top">
                <div class="pull-left">
                        <span class="icon-acb_back_new floorplan__icon-acb_back_new"></span>
                    </div>
                    <div class="pull-right">
                        <span class="icon-inr_search_symbol floorplan__icon-inr_search_symbol"></span>
                        <span class="icon-Nav_settings floorplan__icon-Nav_settings"></span>
                    </div>
                </div>
                <div class="floorplan__name">
                    {{pageTitle.value}}
                </div>

                <h1 class="floorplan__value">
                    <span id="valHighlight">{{headerDataVal.value}}</span>
                    <span class="floorplan__value--part" id="currencyHighlight">{{headerDataValCurrency.value}}</span>
                </h1>
                <p class="floorplan__color-white" id="descHighlight">{{headerDataDesc.value}}</p>

            </header>
            <nav class="floorplan__nav">
                    
                <ul class="floorplan__nav-container">
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="javascript:void(0)">Find order</a><span class="floorplan__nav-step">1</span></li>
                    <li class="floorplan__nav-item floorplan__nav-item--active"><a class="floorplan__nav-link" href="javascript:void(0)">Enter Services</a><span class="floorplan__nav-step">2</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="javascript:void(0)">Attach Media</a><span class="floorplan__nav-step">3</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="javascript:void(0)">Confirm</a><span class="floorplan__nav-step">4</span></li>
                </ul>
            </nav>
            <div class="floorplan__search-bar">
                <input type="text" class="floorplan__search-input" placeholder="Search/scan" />
                <span class="icon-Scan2 floorplan__icon-Scan2"></span>
            </div>
            <div class="floorplan__body">
                <p class="floorplan__select-services">Select services to add entries</p>
                <ul class="floorplan__list-container">
                    <li class="floorplan__list-item">
                        <div class="floorplan__body-container">
                            <!--<h4 class="floorplan__body-heading">Shell canada energy</h4>
                            <p class="floorplan__body-text-1" >Purchase order: 13214</p>
                            <p class="floorplan__body-text-2" >Document date: Jan 21, 2017</p>
                            <p class="floorplan__body-text-2" >Outstanding PO Value: 180,200 USD</p>-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="col-md-1" style="padding: 0;"><input type="radio" /></div>
                                    <div class="col-md-11" style="padding: 0;">
                                        <h4 class="floorplan__body-heading">Purchasing Doc. 4500004876</h4>
                                        <h4 class="floorplan__body-heading">Purchasing Org. R300</h4>
                                        <p class="floorplan__body-text-1" >Vendor: </p>
                                    </div>
                                </div>
                            </div>
                           
                            
                        </div>
                    </li>
                </ul>
            </div>
            <app-fp-footer></app-fp-footer>
        </div>

    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
    <app-loading *ngIf="loading===true"></app-loading>
    <alert type="success" *ngIf="success===true">Configuration saved successfully!!</alert>
       
        <!-- UI FORM START-->
        <form #floorplanUIForm="ngForm" (ngSubmit)="sendFloorplanUI(floorplanUIForm)">
            
            <div class="tabs__buttons">
                <button class="btn btn-primary btn-sm" (click)="showProperties()" type="button">Done</button>
                <button class="btn btn-sm btn-danger" type="button" (click)="removeFloorplan()">Remove</button>
                <span class="pull-right tabs__close-icon glyphicon glyphicon-remove-circle" (click)="showProperties()"></span>
            </div>
        
            <div class="section">
                <h4 class="section__header">
                    PO Header 
                    <span class="section__selected-source">
                        <span class="section__button-change" *ngIf="poHeaderPanel !==true" (click)="showSourceSelector()">Data Provider</span>
                        <span class="section__button-done" (click)="closeSourceSelector()" *ngIf="poHeaderPanel ===true">Back</span>
                    </span>
                 </h4>

                <div class="" [hidden]="poHeaderPanel ===true">
                    
                    <h2 (click)="togglePanel('floorplan__header-props')" class="floorplan__header-text">Header</h2>
                    <div class="floorplan__header-props">                        
                        <h6 class="floorplan__header-text2">Top Menu</h6>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="pageTitle">Page Title</label>
                            <input type="text" value="Service Orders" #pageTitle name="pageTitle" class="form-control" [ngModel]="pageTitle.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerIconsColor">Icons Color</label>
                            <input type="color" value="#87A4B8" #headerIconsColor name="headerIconsColor" class="floorplan__input-small" [ngModel]="headerIconsColor.value" />
                        </div>

                        <div>
                            <hr/>
                        </div>

                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerColor">Header Background</label>
                            <input type="color" value="#435F73" #headerColor name="headerColor" class="floorplan__input-small" [ngModel]="headerColor.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataVal">Header data value</label>
                            <input type="text" value="180,200" #headerDataVal name="headerDataVal" class="form-control" [ngModel]="headerDataVal.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataValCurrency">Header data currency</label>
                            <input type="text" value="USD" #headerDataValCurrency name="headerDataValCurrency" class="form-control" [ngModel]="headerDataValCurrency.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataDesc">Header data description</label>
                            <input type="text" value="Outststanding PO Value" name="headerDataDesc" #headerDataDesc class="form-control" [ngModel]="headerDataDesc.value" />
                        </div>
                    </div>

                    <h2 (click)="togglePanel('floorplan__body-props')" class="floorplan__header-text">Body</h2>
                    <div class="floorplan__body-props" style="display: none;">
                        <p>body form here</p>
                    </div>
                    <div class="floorplan__buttons">
                        <button type="submit" class="btn btn-primary col-md-12">Submit changes</button>
                    </div>
                </div>
            </div>
        </form>
        <!-- UI FORM END-->

        <!--POHEADER START-->
        <form #floorplanDCForm="ngForm" (ngSubmit)="sendFloorplanDC(floorplanDCForm)">
            
            <div id="prop" [hidden]="poHeaderPanel !==true">
                <div class="form-group">
                    <label class="floorplan__form-label">Select data sources</label>
                    <select class="form-control" #dataSources name="dataSources" (change)="showSelectedServices(dataSources.value)" [ngModel]="dataSources.value">
                        <option value="" disabled selected>--Select--</option>
                        <option value="{{data.DataSource}}" *ngFor="let data of dataSource">
                            {{data.DataSource}}
                        </option>
                    </select>
                </div>

                <div class="form-group" *ngIf="connectionServiceDD !== false">
                    <label class="floorplan__form-label" for="connectionService">
                        Connection services
                    </label>
                    <select class="form-control" #connectionService name="connectionService" (change)="onSelectService(connectionService.value)" [ngModel]="connectionService.value">
                        <option value="" disabled selected>--Select--</option>
                        <option value="{{data.ConnectionProvider}}" *ngFor="let data of connectionProviders">
                            {{data.ConnectionProvider}}
                        </option>
                    </select>
                </div>

            <div class="form-group" [hidden]="searchAPI === false">
                    <label class="floorplan__form-label" for="searchApi">Search API</label>
                    <input type="text" class="form-control" #searchApi (blur)="showListOfAPIs(searchApi.value)" placeholder="Enter API name" />
                </div>

                <div class="form-group" >
                    <div *ngIf="apiListDD !== false">
                    <label class="floorplan__form-label" for="listofSearchedApis">
                        Select API
                    </label>
                    <select  class="form-control" #listofSearchedApis name="listofSearchedApis" (change)="showListOfFields(listofSearchedApis.value)" [ngModel]="listofSearchedApis.value">
                        <option value="" disabled selected>--Select--</option>
                        <option value="{{data.APIName}}" *ngFor="let data of APIList">
                            {{data.APIName}} - {{data.APIDesc}}
                        </option>
                    </select>
                    </div>
                </div>

                <div class="" *ngIf="showFields !== false">
                    <div class="form-group">
                        <label class="floorplan__form-label" for="totalAmmount">
                            Total Ammount
                        </label>
                    
                        <select (focusout)="removeHighlightCorresponding('valHighlight')" (focus)="highlightCorresponding('valHighlight')" class="form-control" name="totalAmmount" #totalAmmount [ngModel]="totalAmmount.value">
                            <!--<ng-template #arun *ngFor="let data of listOfFields">
                                <optgroup *ngIf="data.ParameterType === 'IMPORT'">
                                    <option> {{data.FieldName}} - {{data.FieldDesc}}</option>
                                </optgroup>
                            </ng-template>-->
                            <option value="" disabled selected>--Select--</option>
                            <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields">
                                {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="floorplan__form-label" for="currencyType">
                            Currency Type
                        </label>
                        <select (focusout)="removeHighlightCorresponding('currencyHighlight')" (focus)="highlightCorresponding('currencyHighlight')" class="form-control" #currencyType name="currencyType" [ngModel]="currencyType.value">
                            <option value="" disabled selected>--Select--</option>
                            <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields" >
                                {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="floorplan__form-label" for="headerDesc">
                            Header Description
                        </label>
                        <select (focusout)="removeHighlightCorresponding('descHighlight')" (focus)="highlightCorresponding('descHighlight')" class="form-control" #headerDesc name="headerDesc" [ngModel]="headerDesc.value">
                            <option value="" disabled selected>--Select--</option>
                            <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields" >
                                {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                            </option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary col-md-12">Submit changes</button>
                </div>
            </div>
            </form>
        <!--POHEADER END-->
       
    <div style="padding: 10px 0;">
        <hr/>
    </div>
    <div>
        <h4>PO Items <span class="pull-right" style="font-size: 10px; color: #3179AA; font-weight: bolder;">Data Provider</span></h4>
    </div></div>

  `,
  styleUrls:['./scss/fp.component.scss', './scss/section.scss'],
  providers: [DataSourceService, ConnectionProviderService, APIListService, ListOfFieldsService, CPDPPostService, FloorplanUIPostService]
})

export class FP2Component {

    loading: boolean;
    connectionServiceDD: boolean = false;
    searchAPI: boolean = false;
    apiListDD: boolean = false;
    loadingApis: boolean = false;
    showFields: boolean = false;
    success: boolean = false;

    public showPropertyPanel: boolean = false;
    public poHeaderPanel;
    public dataSource = [];
    public connectionProviders = [];
    public APIList = [];
    public listOfFields = [];

    private postData;
    

    apiVal: string 
    systemId: string 
    cpName: string
    selectedAPI: string;

    constructor(
        private router: Router, 
        private _dataSourceService: DataSourceService,
        private _connectionProviderService: ConnectionProviderService,
        private _apiListService: APIListService,
        private _listOfFieldsService: ListOfFieldsService,
        private _cpdpPostService: CPDPPostService,
        private _floorplanUIPostService : FloorplanUIPostService

        ) {}

    //post request 1
    cpdpTotalAmmout = {
        "DPConfig" : "[{\"label\":\"SummaryAmount\",\"position\":\"1\"}]",
        "Key" : true,
        "ModuleID" : "SES_CONF",
        "DataProvider" : "POHEADER",
        "FieldName" : "", //* field name
        "APIName" : "", // * api name
        "ParameterName" : "", //* param name
        "Status" : true, // always true
        "DataSource" : "", //* system id
        "ConnectionProvider" : "" //* cp name
    }

    //post request 2
    cpdpCurrencyType = {
        "DPConfig" : "[{\"label\":\"CurrencyType\",\"position\":\"2\"}]",
        "Key" : true,
        "ModuleID" : "SES_CONF",
        "DataProvider" : "POHEADER",
        "FieldName" : "", //* field name
        "APIName" : "", // * api name
        "ParameterName" : "", //* param name
        "Status" : true, // always true
        "DataSource" : "", //* system id
        "ConnectionProvider" : "" //* cp name
    }

    //post request 2
    cpdpHeaderDesc = {
        "DPConfig" : "[{\"label\":\"HeaderDesc\",\"position\":\"3\"}]",
        "Key" : true,
        "ModuleID" : "SES_CONF",
        "DataProvider" : "POHEADER",
        "FieldName" : "", //* field name
        "APIName" : "", // * api name
        "ParameterName" : "", //* param name
        "Status" : true, // always true
        "DataSource" : "", //* system id
        "ConnectionProvider" : "" //* cp name
    }

    FPConfigWrapper = {  
        "AppID":"MINVENTORY",
        "ModuleID":"SES_CONF",
        "FPID":"FP_07_DOL_01",
        "FPName":"Floor Plan 2",
        "Status":"X",
        "FPConfg":""
    }

    floorplan_new = 
        {
            "id": 1,
            "floorName": "FP_07_DOL_01",
            "pageTitle": "Service Orders",
            "pageTitleColor": "#87A4B8",
            "headerColor": "#435F73",
            "headerIconsColor": "#87A4B8",
            "header": {
                
                "left":[],
                "right":[{
                         "elementTitle":"",
                         "position":1,
                         "style":"{'textColor':'#87A4B8'}",
                         "componentCategory":"BTN",
                         "componentType":"DEFAULTSBTN",
                         "dataprovider":"",
                         "dataproviderType":"",
                         "dataproviderParameters":"",
                         "dpParameters":"",
                         "navigation":""
                         },
                         {
                         "elementTitle":"",
                         "position":2,
                         "style":"{'textColor':'#87A4B8'}",
                         "componentCategory":"BTN",
                         "componentType":"SEARCHBTN",
                         "dataprovider":"",
                         "dataproviderType":"",
                         "dpParameters":"",
                         "navigation":""
                         }]
                
            },
            
            "body":[
                    {"elementTitle":"FIND ORDER",
                    "position":1,
                    "style":"{'textColor':'','selectionColor':''}",
                    "componentCategory":"WIDGETTABBARITEM",
                    "componentType":"ORDERSTAB",
                    "dataprovider":"SOHEADER",
                    "dataproviderType":"GET",
                    "dpParameters":"",
                    "navigation":""
                    },
                    {"elementTitle":"ENTER SERVICES",
                    "position":2,
                    "style":"{'textColor':'','selectionColor':''}",
                    "componentCategory":"WIDGETTABBARITEM",
                    "componentType":"ORDERSTAB",
                    "dataprovider":"",
                    "dataproviderType":"GET",
                    "dpParameters":"",
                    "navigation":""
                    },
                    {"elementTitle":"ADD NOTES & MEDIA",
                    "position":3,
                    "style":"{'textColor':'','selectionColor':''}",
                    "componentCategory":"WIDGETTABBARITEM",
                    "componentType":"ORDERSTAB",
                    "dataprovider":"",
                    "dataproviderType":"GET",
                    "dpParameters":"",
                    "navigation":""
                    },
                    {"elementTitle":"REVIEW AND CONFIRM",
                    "position":4,
                    "style":"{'textColor':'','selectionColor':''}",
                    "componentCategory":"WIDGETTABBARITEM",
                    "componentType":"ORDERSTAB",
                    "dataprovider":"",
                    "dataproviderType":"GET",
                    "dpParameters":"",
                    "navigation":""
                    }
                    ],
            
            "footer": []
            
        }
            

    onGetData (): void {
        this.loading = true
        this._dataSourceService.getDataSources()
            .subscribe(
                data => {this.dataSource = data.d.results},
                error => console.log(error),
                () => this.loading = false
            );
    }

    showSelectedServices(val:string) {
        console.log("selected: "+val);
        this.systemId = val;
        this.loading = true;
        this._connectionProviderService.getConnectionProviders(val)
            .subscribe(
                data => this.connectionProviders = data.d.results,
                error => console.log(error),
                ()=> 
                {
                    this.loading = false;
                    this.connectionServiceDD = true}
            )
    }
    onSelectService(val: string){
        console.log("selected: "+val);
        this.cpName = val;
        if(val!== "Select"){
            this.searchAPI = true;
        }else{
            this.searchAPI = false;
        }
        
    }
    showListOfAPIs(val: string){
        if(val.length >= 2){
            this.loading = true;
            this.apiVal = val;
            this._apiListService.getApiList(this.apiVal, this.systemId, this.cpName)
            .subscribe(
                data => this.APIList = data.d.results,
                error => console.log(error),
                () => {this.loading = false
                    this.apiListDD = true
                }
            )
            
        }
    }
    showListOfFields(val: string){
        if(val !== 'Select'){
            this.selectedAPI = val;
            console.log(this.searchAPI);
            this.loading = true;
            this._listOfFieldsService.getListOfFields(this.selectedAPI, this.systemId, this.cpName)
            .subscribe(
                data => this.listOfFields = data.d.results,
                error => console.log(error),
                () => {
                    this.showFields = true
                    this.loading = false;
                    //console.log(this.listOfFields)
                }
            )
            
        }
    }
    
    postallObjects($obj1, $obj2, $obj3){
        this.loading = true;
        let _token:string = '';
        let _status;
        this._cpdpPostService.getTokenData().subscribe(
            data => 
                _token = data
            ,
            error => console.log(error),
            () => {
                if(_token !== ''){
                    console.log('its not empty');
                    console.log("token before:: "+_token);
                    
                    this._cpdpPostService.doPost1($obj1, _token).subscribe(
                        
                        ()=> {
                            
                        }
                    )

                    setTimeout(()=>{
                        this._cpdpPostService.doPost2($obj2, _token).subscribe(
                            
                            ()=> {
                            
                            }
                        )
                    },4000);

                    setTimeout(()=>{
                        this._cpdpPostService.doPost3($obj3, _token).subscribe(
                            
                            ()=> {
                                console.log('completed 3')
                                this.loading = false;

                                console.log(this.poHeaderPanel)
                                this.poHeaderPanel = false;
                                this.success = true;
                                setTimeout(()=>{
                                    this.success = false;
                            },8000);
                            }
                        )
                    },5000);
                }
            }
        )
    }
    postUIObject($uiObj){
        
        console.log('initiating..');

        this.loading = true;
        let _token:string = '';
        let _status;
        this._floorplanUIPostService.getTokenData().subscribe(
            data => 
                _token = data
            ,
            error => console.log(error),
            () => {
                if(_token !== ''){
                    
                    this._floorplanUIPostService.doPost($uiObj, _token).subscribe(
                        ()=> {
                            console.log('completed')
                            this.loading = false;
                        }
                    )
                }
            }
        )
    }
    
    closeSourceSelector(){
        this.poHeaderPanel =! this.poHeaderPanel;
    }

    showProperties(){
        this.showPropertyPanel =! this.showPropertyPanel;
    }

    gotToNextScreen(){
        this.router.navigateByUrl('app-designer/list/ui/fp2');
    }
    gotToPreviousScreen(){
        this.router.navigateByUrl('app-designer/list/ui/fp1');
    }

     removeFloorplan(){
        let r = confirm("Are you sure ?");
        if (r == true) {
            this.router.navigateByUrl('app-designer/list/ui');
        }
    }

    showSourceSelector(){
        this.poHeaderPanel =! this.poHeaderPanel;
        if(this.dataSource.length === 0){
            this.onGetData();
        }
    }
    
    highlightCorresponding(val){
        jQuery("#"+val).addClass('floorplan__highlight');
    }

    removeHighlightCorresponding(val){
        jQuery("#"+val).removeClass('floorplan__highlight');
    }

    togglePanel(id){
        jQuery("."+id).slideToggle();
    }


    sendFloorplanUI(form: NgForm){

        //top menu
        this.floorplan_new.pageTitle = form.value.pageTitle;
        this.floorplan_new.header.right[0].style = "{'textColor':" + "'"+ form.value.headerIconsColor + "'" + "}";
        this.floorplan_new.header.right[1].style = "{'textColor':"+ "'"+ form.value.headerIconsColor + "'" +"}";

        //header
        this.floorplan_new.headerColor = form.value.headerColor;

        //adding to the fpconfig payload
        this.FPConfigWrapper.FPConfg = JSON.stringify(this.floorplan_new)
        //console.log(this.FPConfigWrapper);

        console.log(JSON.stringify(this.FPConfigWrapper));

        this.postUIObject(JSON.stringify(this.FPConfigWrapper))

    }

    sendFloorplanDC(form: NgForm){

        //this is a hack for the demo purpose
        var feild1 = form.value.totalAmmount;
        var parts1 = feild1.split('/', 2);

        var feild2 = form.value.currencyType;
        var parts2 = feild2.split('/', 2);

        var feild3 = form.value.headerDesc;
        var parts3 = feild3.split('/', 2);

        this.cpdpTotalAmmout.DataSource = form.value.dataSources
        this.cpdpTotalAmmout.ConnectionProvider = form.value.connectionService
        this.cpdpTotalAmmout.ParameterName = parts1[1] 
        this.cpdpTotalAmmout.APIName = form.value.listofSearchedApis
        this.cpdpTotalAmmout.FieldName = parts1[0] 

        this.cpdpCurrencyType.DataSource = form.value.dataSources
        this.cpdpCurrencyType.ConnectionProvider = form.value.connectionService
        this.cpdpCurrencyType.ParameterName = parts2[1] 
        this.cpdpCurrencyType.APIName = form.value.listofSearchedApis
        this.cpdpCurrencyType.FieldName = parts2[0] 

        this.cpdpHeaderDesc.DataSource = form.value.dataSources
        this.cpdpHeaderDesc.ConnectionProvider = form.value.connectionService
        this.cpdpHeaderDesc.ParameterName = parts3[1] 
        this.cpdpHeaderDesc.APIName = form.value.listofSearchedApis
        this.cpdpHeaderDesc.FieldName = parts3[0]
        
        console.log("field 1 object...");
        console.log(this.cpdpTotalAmmout)
        console.log("field 2 object...");
        console.log(this.cpdpCurrencyType)
        console.log("field 3 object...");
        console.log(this.cpdpHeaderDesc)


        //Calls
        this.postallObjects(this.cpdpTotalAmmout, this.cpdpCurrencyType, this.cpdpHeaderDesc)
    }
}