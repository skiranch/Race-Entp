import { Component, NgModule, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON } from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

// services
import { DataSourceService } from './services/data-source.service'
import { ConnectionProviderService } from './services/connection-provider.service'
import { APIListService } from './services/APIList.service'
import { ListOfFieldsService } from './services/listOfFields.service'
import { CPDPPostService } from './services/CPDP-post.service'
import { FloorplanUIPostService } from './services/floorplanUI-post.service'

//Json data
import * as data from './fp2.json'
const floorplanData = (<any>data);
console.log(floorplanData);

declare var jQuery: any;

@Component({
    template: `
  <div class="frame">
    <span class="frame__prev glyphicon glyphicon-triangle-right" (click)="gotToNextScreen()">Next</span>
    <span class="frame__next glyphicon glyphicon-triangle-left" (click)="gotToPreviousScreen()">Prev</span>
    <a href="javascript:void(0)" class="legend" (click)="showProperties()">Properties</a>
        <div class="floorplan">
            <header class="floorplan__header">
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
                    <li class="floorplan__nav-item floorplan__nav-item--active"><a class="floorplan__nav-link" href="javascript:void(0)">Find order</a><span class="floorplan__nav-step">1</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="javascript:void(0)">Enter Services</a><span class="floorplan__nav-step">2</span></li>
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
                                    <div class="col-md-12 app-designer__no-padding">
                                        <h4 class="floorplan__body-heading" id="purchasingDocVal">{{purchasingDoc.value}} 4500004876</h4>
                                        <h4 class="floorplan__body-heading" id="purchasingOrgVal">{{purchasingOrg.value}} R300</h4>
                                        <p class="floorplan__body-text-1" id="purchasingVendorVal">{{vendor.value }} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <app-fp-footer activeSearch="" activeOrders="fp2__footer-link--active"></app-fp-footer>
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
                
                <div [hidden]="poSummaryPanel === true || poHeaderPanel ===true ">
                    
                    <span class="section__selected-source">
                        <span class="section__button-change" (click)="showSourceSelector()">Configure data Providers</span>
                    </span>

                    <h4 class="section__header">
                        <span (click)="togglePanel('floorplan__summary-props')">
                            {{dataProvider.value}}
                        </span>
                        
                    </h4>
                        
                    <div class="floorplan__summary-props">                        
                        <h6 class="floorplan__header-text2">Top Menu</h6>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="pageTitle">Page Title</label>
                            <input type="text" value="Service Orders" #pageTitle name="pageTitle" class="form-control" [ngModel]="pageTitle.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="dataProvider">Data Provider</label>
                            <input type="text" value="POSUMMARY" #dataProvider name="dataProvider" class="form-control" [ngModel]="dataProvider.value" />
                        </div>
                        <!--<div class="form-group">
                            <label class="floorplan__form-label" for="headerIconsColor">Icons Color</label>
                            <input type="color" value="#87A4B8" #headerIconsColor name="headerIconsColor" class="floorplan__input-small" [ngModel]="headerIconsColor.value" />
                        </div>-->
                        <div>
                            <hr/>
                        </div>
                        <!-- <div class="form-group">
                            <label class="floorplan__form-label" for="headerColor">Header Background</label>
                            <input type="color" value="#435F73" #headerColor name="headerColor" class="floorplan__input-small" [ngModel]="headerColor.value" />
                        </div>-->
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataVal">Header data value</label>
                            <input type="text" value="180,200" disabled #headerDataVal name="headerDataVal" class="form-control" [ngModel]="headerDataVal.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataValCurrency">Header data currency</label>
                            <input type="text" value="USD" disabled #headerDataValCurrency name="headerDataValCurrency" class="form-control" [ngModel]="headerDataValCurrency.value" />
                        </div>
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataDesc">Header data description</label>
                            <input type="text" value="Outststanding PO Value" name="headerDataDesc" #headerDataDesc class="form-control" [ngModel]="headerDataDesc.value" />
                        </div>
                    </div>

                </div>

                <div [hidden]=" poHeaderPanel === true || poSummaryPanel ===true">

                    <h4 class="section__header">
                        <span (click)="togglePanel('floorplan__header-props')">
                            {{headerDataProvider.value}}
                        </span>
                    </h4>

                    <div class="floorplan__header-props" style="display: none;">
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerDataProvider">Data Provider</label>
                            <input type="text" value="POHEADER" #headerDataProvider name="headerDataProvider" class="form-control" [ngModel]="headerDataProvider.value" />
                        </div>

                        <div class="form-group">
                            <input type="text" value="Purchasing Doc:" #purchasingDoc name="purchasingDoc" class="form-control" [ngModel]="purchasingDoc.value" />
                            <input type="text" value="4500004876" class="form-control" disabled />
                        </div>
                        
                        <div class="form-group">
                            <input type="text" value="Purchasing Org:" #purchasingOrg name="purchasingOrg" class="form-control" [ngModel]="purchasingOrg.value" />
                            <input type="text" value="R300" class="form-control" disabled />
                        </div>

                        <div class="form-group">
                            <input type="text" value="Vendor:" #vendor name="vendor" class="form-control" [ngModel]="vendor.value" />
                            <input type="text" value="" class="form-control" disabled />
                        </div>

                    </div>

                </div>

                <div class="floorplan__buttons" [hidden]=" poHeaderPanel === true || poSummaryPanel === true ">
                    <button type="submit" class="btn btn-success col-md-12">Submit changes</button>
                </div>
                
            </div>
        </form>
        <!-- UI FORM END-->

        <!--POSUMMARY START-->
        <form #floorplanDCForm="ngForm" (ngSubmit)="sendFloorplanDC(floorplanDCForm)">
            
        <div [hidden]="poSummaryPanel !==true">

            <h4 class="section__header">
                {{dataProvider.value}} / {{headerDataProvider.value}}
                
                <span class="section__selected-source">
                    <span class="section__button-done" (click)="showSourceSelector()">Back</span>
                </span>

            </h4>
        
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
            
            <ul class="section__nav" [hidden]="searchAPI === false">
                <li class="section__nav-list active"><a class="section__nav-item" data-toggle="tab" href="#1b">{{dataProvider.value}}</a></li>
                <li class="section__nav-list"><a class="section__nav-item" data-toggle="tab" href="#2b">{{headerDataProvider.value}}</a></li>
            </ul>
            
            <div class="tab-content clearfix">
                <div class="tab-pane active" id="1b">
                
                    <div class="form-group" [hidden]="searchAPI === false">
                        <label class="floorplan__form-label" for="searchApi">Search API</label>
                        <input type="text" class="form-control" #searchApi (blur)="showListOfAPIs(searchApi.value)" placeholder="Enter API name" />
                    </div>

                    <div class="form-group">
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
                        <input type="hidden" [ngModel]="dataProvider.value" #dataProviderVal name="dataProviderVal" value="dataProvider.value" />
                        <input type="hidden" [ngModel]="headerDataProvider.value" #headerDataProviderVal name="headerDataProviderVal" value="headerDataProvider.value" />

                        <div class="form-group">
                            <label class="floorplan__form-label" for="totalAmmount">
                                Total Ammount
                            </label>
                        
                            <select (focusout)="removeHighlightCorresponding('valHighlight')" (focus)="highlightCorresponding('valHighlight')" class="form-control" name="totalAmmount" #totalAmmount [ngModel]="totalAmmount.value">
                                
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

                        <!--<div class="form-group">
                            <label class="floorplan__form-label" for="headerDesc">
                                Header Description
                            </label>
                            <select (focusout)="removeHighlightCorresponding('descHighlight')" (focus)="highlightCorresponding('descHighlight')" class="form-control" #headerDesc name="headerDesc" [ngModel]="headerDesc.value">
                                <option value="" disabled selected>--Select--</option>
                                <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields" >
                                    {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                                </option>
                            </select>
                        </div>-->

            </div>

                </div>
                <div class="tab-pane" id="2b">
                
                    <input type="hidden" [ngModel]="purchasingDoc.value" #purchasingDocVal name="purchasingDocVal" value="purchasingDoc.value" />
                    <input type="hidden" [ngModel]="purchasingOrg.value" #purchasingOrgVal name="purchasingOrgVal" value="purchasingOrg.value" />
                    <input type="hidden" [ngModel]="vendor.value" #vendorVal name="vendorVal" value="vendor.value" />
                    
                    <div class="form-group" [hidden]="searchAPI2 === false">
                        <label class="floorplan__form-label" for="searchApi2">Search API</label>
                        <input type="text" class="form-control" #searchApi2 (blur)="showListOfAPIs2(searchApi2.value)" placeholder="Enter API name" />
                    </div>

                    <div class="form-group">
                        <div *ngIf="apiListDD2 !== false">
                            <label class="floorplan__form-label" for="listofSearchedApis">
                                Select API
                            </label>
                            <select  class="form-control" #listofSearchedApis2 name="listofSearchedApis2" (change)="showListOfFields2(listofSearchedApis2.value)" [ngModel]="listofSearchedApis2.value">
                                <option value="" disabled selected>--Select--</option>
                                <option value="{{data2.APIName}}" *ngFor="let data2 of APIList2">
                                    {{data2.APIName}} - {{data2.APIDesc}}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="" *ngIf="showFields2 !== false">
                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerPurchasingDoc">
                                {{purchasingDoc.value}}
                            </label>
                        
                            <select (focusout)="removeHighlightCorresponding('purchasingDocVal')" (focus)="highlightCorresponding('purchasingDocVal')" class="form-control" name="headerPurchasingDoc" #headerPurchasingDoc [ngModel]="headerPurchasingDoc.value">
                                <option value="" disabled selected>--Select--</option>
                                <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields2">
                                    {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                                </option>
                            </select>

                            <select class="form-control" name="headerPurchasingDocType" #headerPurchasingDocType [ngModel]="headerPurchasingDocType.value">
                                <option value="" disabled selected>--Select type--</option>
                                <option value="LF">Label Field</option>
                                <option value="TF">Text Field</option>
                            </select>
                        </div>

                        <div class="form-group">
                                <label class="floorplan__form-label" for="headerPurchasingOrg">
                                    {{purchasingOrg.value}}
                                </label>
                                <select (focusout)="removeHighlightCorresponding('purchasingOrgVal')" (focus)="highlightCorresponding('purchasingOrgVal')" class="form-control" #headerPurchasingOrg name="headerPurchasingOrg" [ngModel]="headerPurchasingOrg.value">
                                    <option value="" disabled selected>--Select--</option>
                                    <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields2" >
                                        {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                                    </option>
                                </select>

                               <select class="form-control" name="headerPurchasingOrgType" #headerPurchasingOrgType [ngModel]="headerPurchasingOrgType.value">
                                    <option value="" disabled selected>--Select type--</option>
                                    <option value="LF">Label Field</option>
                                    <option value="TF">Text Field</option>
                                </select>
                        </div>

                        <div class="form-group">
                            <label class="floorplan__form-label" for="headerVendor">
                                {{vendor.value}}
                            </label>
                            <select (focusout)="removeHighlightCorresponding('purchasingVendorVal')" (focus)="highlightCorresponding('purchasingVendorVal')" class="form-control" #headerVendor name="headerVendor" [ngModel]="headerVendor.value">
                                <option value="" disabled selected>--Select--</option>
                                <option value="{{data.FieldName}}/{{data.ParameterName}}" *ngFor="let data of listOfFields2" >
                                    {{data.ParameterType}} - {{data.FieldName}} - {{data.FieldDesc}}
                                </option>
                            </select>
                            <select class="form-control" name="headerVendorType" #headerVendorType [ngModel]="headerVendorType.value">
                                <option value="" disabled selected>--Select type--</option>
                                <option value="LF">Label Field</option>
                                <option value="TF">Text Field</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-success col-md-12">Submit changes</button>
        </div>

        </form>
        <!--POSUMMARY END-->

   </div>

  `,
    styleUrls: ['./scss/fp.component.scss', './scss/section.scss'],
    providers: [DataSourceService, ConnectionProviderService, APIListService, ListOfFieldsService, CPDPPostService, FloorplanUIPostService]
})

export class FP2Component {

    loading: boolean;
    connectionServiceDD: boolean = false;
    searchAPI: boolean = false;
    searchAPI2: boolean = false;
    apiListDD: boolean = false;
    apiListDD2: boolean = false;
    loadingApis: boolean = false;
    showFields: boolean = false;
    showFields2: boolean = false;
    success: boolean = false;

    public showPropertyPanel: boolean = false;
    public poSummaryPanel;
    public poHeaderPanel;
    public dataSource = [];
    public connectionProviders = [];
    public APIList = [];
    public APIList2 = [];
    public listOfFields = [];
    public listOfFields2 = [];
    

    private postData;

    apiVal: string
    systemId: string
    cpName: string
    selectedAPI: string;
    selectedAPI2: string;

    constructor(
        private router: Router,
        private _dataSourceService: DataSourceService,
        private _connectionProviderService: ConnectionProviderService,
        private _apiListService: APIListService,
        private _listOfFieldsService: ListOfFieldsService,
        private _cpdpPostService: CPDPPostService,
        private _floorplanUIPostService: FloorplanUIPostService

    ) { }

    //post request 1
    cpdpTotalAmmout = {
        "DPConfig": "[{\"label\":\"SummaryAmount\",\"position\":\"1\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 2
    cpdpCurrencyType = {
        "DPConfig": "[{\"label\":\"CurrencyType\",\"position\":\"2\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 3
    cpdpHeaderDesc = {
        "DPConfig": "[{\"label\":\"HeaderDesc\",\"position\":\"3\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 4
    cpdpPurchasingDoc = {
        "DPConfig": "[{\"label\":\"\",\"position\":\"1\",\"uifieldtype\":\"\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 5
    cpdpPurchasingOrg = {
        "DPConfig": "[{\"label\":\"\",\"position\":\"2\",\"uifieldtype\":\"\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 6
    cpdpPurchasingVendor = {
        "DPConfig": "[{\"label\":\"\",\"position\":\"3\",\"uifieldtype\":\"\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    FPConfigWrapper = {
        "AppID": "MINVENTORY",
        "ModuleID": "SES_CONF",
        "FPID": "FP_07_DOL_01",
        "FPName": "Floor Plan 2",
        "Status": "X",
        "FPConfg": ""
    }

    floorplan_new =
    {
        "id": 1, "floorName": "FP_07_DOL_01",
        "pageTitle": "Service Orders",
        "pageTitleColor": "#87A4B8",
        "headerColor": "#0000ff",
        "headerIconsColor": "#87A4B8",
        "header": {
            "left": [],
            "right": [{
                "elementTitle": "",
                "position": 1,
                "style": "{'textColor':'#87a4b8'}",
                "componentCategory": "BTN",
                "componentType": "DEFAULTSBTN",
                "dataprovider": "",
                "dataproviderType": "",
                "dataproviderParameters": "",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "",
                "position": 2,
                "style": "{'textColor':'#87a4b8'}",
                "componentCategory": "BTN",
                "componentType": "SEARCHBTN",
                "dataprovider": "",
                "dataproviderType": "",
                "dpParameters": "",
                "navigation": ""
            }]
        },
        "body": [
            {
                "elementTitle": "Outstanding PO Value",
                "position": 1,
                "style": "",
                "componentCategory": "HEADER",
                "componentType": "HEADERWITHOUTSTANDINGVALUE",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "FIND ORDER",
                "position": 2,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "ENTER SERVICES",
                "position": 3,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "ADD NOTES & MEDIA",
                "position": 4,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "REVIEW AND CONFIRM",
                "position": 5,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            }],
        "footer": []
    }


    onGetData(): void {
        this.loading = true
        this._dataSourceService.getDataSources()
            .subscribe(
            data => { this.dataSource = data.d.results },
            error => console.log(error),
            () => this.loading = false
            );
    }

    showSelectedServices(val: string) {
        console.log("selected: " + val);
        this.systemId = val;
        this.loading = true;
        this._connectionProviderService.getConnectionProviders(val)
            .subscribe(
            data => this.connectionProviders = data.d.results,
            error => console.log(error),
            () => {
                this.loading = false;
                this.connectionServiceDD = true
            }
            )
    }

    onSelectService(val: string) {
        console.log("selected: " + val);
        this.cpName = val;
        if (val !== "Select") {
            this.searchAPI = true;
            this.searchAPI2 = true;
        } else {
            this.searchAPI = false;
            this.searchAPI2 = false;
        }

    }

    showListOfAPIs(val: string) {
        console.log(val)
        
        if (val.length >= 2) {
            this.loading = true;
            this.apiVal = val;
            this._apiListService.getApiList(this.apiVal, this.systemId, this.cpName)
                .subscribe(
                data => this.APIList = data.d.results,
                error => console.log(error),
                () => {
                    this.loading = false
                    this.apiListDD = true
                }
                )

        }
    }

    showListOfAPIs2(val: string) {
        console.log(val)
        if (val.length >= 2) {
            this.loading = true;
            this.apiVal = val;
            this._apiListService.getApiList(this.apiVal, this.systemId, this.cpName)
                .subscribe(
                data => this.APIList2 = data.d.results,
                error => console.log(error),
                () => {
                    this.loading = false
                    this.apiListDD2 = true
                }
                )

        }
    }

    showListOfFields(val: string) {
        if (val !== 'Select') {
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

    showListOfFields2(val: string) {
        if (val !== 'Select') {
            this.selectedAPI2 = val;
            console.log(this.searchAPI);
            this.loading = true;
            this._listOfFieldsService.getListOfFields(this.selectedAPI2, this.systemId, this.cpName)
                .subscribe(
                data => this.listOfFields2 = data.d.results,
                error => console.log(error),
                () => {
                    this.showFields2 = true
                    this.loading = false;
                    //console.log(this.listOfFields)
                }
            )

        }
    }

    postallObjects($obj1, $obj2, $obj4, $obj5, $obj6) {
        this.loading = true;
        let _token: string = '';
        let _status;
        this._cpdpPostService.getTokenData().subscribe(
            data =>
                _token = data
            ,
            error => console.log(error),
            () => {
                if (_token !== '') {
                    console.log('its not empty');
                    console.log("token before:: " + _token);

                    this._cpdpPostService.doPost1($obj1, _token).subscribe(
                        () => { }
                    )

                    setTimeout(() => {
                        this._cpdpPostService.doPost2($obj2, _token).subscribe(
                            () => { }
                        )
                    }, 4000);

                    setTimeout(() => {
                        this._cpdpPostService.doPost4($obj4, _token).subscribe(
                            () => { }
                        )
                    }, 6000);

                    setTimeout(() => {
                        this._cpdpPostService.doPost5($obj5, _token).subscribe(
                            () => { }
                        )
                    }, 8000);

                    setTimeout(() => {
                        this._cpdpPostService.doPost6($obj6, _token).subscribe(
                            () => {
                                console.log('completed all 6')
                                this.loading = false;
                                this.poSummaryPanel = false;
                                this.success = true;

                                setTimeout(() => {
                                    this.success = false;
                                }, 11000);
                            }
                        )
                    }, 10000);
                }
            }
        )
    }

    postUIObject($uiObj) {

        console.log('initiating..');

        this.loading = true;
        let _token: string = '';
        let _status;
        this._floorplanUIPostService.getTokenData().subscribe(
            data =>
                _token = data
            ,
            error => console.log(error),
            () => {
                if (_token !== '') {

                    this._floorplanUIPostService.doPost($uiObj, _token).subscribe(
                        () => {
                            console.log('completed')
                            this.loading = false;
                        }
                    )
                }
            }
        )
    }

    closeSourceSelector() {
        this.poSummaryPanel = !this.poSummaryPanel;
    }

    closeHeaderSourceSelector() {
        this.poHeaderPanel = !this.poHeaderPanel;
    }

    showProperties() {
        this.showPropertyPanel = !this.showPropertyPanel;
    }

    gotToNextScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp3');
    }

    gotToPreviousScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp1');
    }

    removeFloorplan() {
        let r = confirm("Are you sure ?");
        if (r == true) {
            this.router.navigateByUrl('app-designer/list/ui');
        }
    }

    showSourceSelector() {
        this.poSummaryPanel = !this.poSummaryPanel;
        if (this.dataSource.length === 0) {
            this.onGetData();
        }
    }

    //can be removed
    showHeaderSourceSelector() {
        this.poHeaderPanel = !this.poHeaderPanel;
        if (this.dataSource.length === 0) {
            this.onGetData();
        }
    }

    highlightCorresponding(val) {
        jQuery("#" + val).addClass('floorplan__highlight');
    }

    removeHighlightCorresponding(val) {
        jQuery("#" + val).removeClass('floorplan__highlight');
    }

    togglePanel(id, event: any) {
        jQuery("." + id).slideToggle();

    }

    sendFloorplanUI(form: NgForm) {

        //top menu
        this.floorplan_new.pageTitle = form.value.pageTitle;

        //this.floorplan_new.header.right[0].style = "{'textColor':" + "'" + form.value.headerIconsColor + "'" + "}";
        //this.floorplan_new.header.right[1].style = "{'textColor':" + "'" + form.value.headerIconsColor + "'" + "}";

        //header
        this.floorplan_new.headerColor = form.value.headerColor;

        //POSUMMARY
        this.floorplan_new.body[0].dataprovider = form.value.dataProvider;
        this.floorplan_new.body[0].elementTitle = form.value.headerDataDesc;

        //POHEADER
        this.floorplan_new.body[1].dataprovider = form.value.bodyDataProvider;


        //adding to the fpconfig payload
        this.FPConfigWrapper.FPConfg = JSON.stringify(this.floorplan_new)
        console.log(this.floorplan_new);

        //console.log(JSON.stringify(this.FPConfigWrapper));

        this.postUIObject(JSON.stringify(this.FPConfigWrapper))

    }

    sendFloorplanHeaderData(form: NgForm) {
        console.log('Header data');

        console.log(form.value)

    }

    sendFloorplanDC(form: NgForm) {

        //this is a hack for the demo purpose
        if(form.value.totalAmmount !== undefined){
            var feild1 = form.value.totalAmmount;
            var parts1 = feild1.split('/', 2);
        }else{
            var parts1 = <any>[];
            parts1[0] = 'Not Selected';
            parts1[1] = 'Not Selected';
        }
        if(form.value.currencyType !== undefined){
            var feild2 = form.value.currencyType;
            var parts2 = feild2.split('/', 2);
        }else{
            var parts2 = <any>[];
            parts2[0] = 'Not Selected';
            parts2[1] = 'Not Selected';
        }
        if(form.value.headerDesc !== undefined){
            var feild3 = form.value.headerDesc;
            var parts3 = feild3.split('/', 2);
        }else{
            var parts3 = <any>[];
            parts3[0] = 'Not Selected';
            parts3[1] = 'Not Selected';
        }
        if(form.value.headerPurchasingDoc !== undefined){
            var feild4 = form.value.headerPurchasingDoc;
            var parts4 = feild4.split('/', 2);
        }else{
            var parts4 = <any>[];
            parts4[0] = 'Not Selected';
            parts4[1] = 'Not Selected';
        }
        if(form.value.headerPurchasingOrg !== undefined){
            var feild5 = form.value.headerPurchasingOrg;
            var parts5 = feild5.split('/', 2);
        }else{
            var parts5 = <any>[];
            parts5[0] = 'Not Selected';
            parts5[1] = 'Not Selected';
        }
        if(form.value.headerVendor !== undefined){
            var feild6 = form.value.headerVendor;
            var parts6 = feild6.split('/', 2);
        }else{
            var parts6 = <any>[];
            parts6[0] = 'Not Selected';
            parts6[1] = 'Not Selected';
        }

        console.log(parts1)
        this.cpdpTotalAmmout.DataSource = form.value.dataSources;
        this.cpdpTotalAmmout.ConnectionProvider = form.value.connectionService;
        this.cpdpTotalAmmout.ParameterName = parts1[1];
        this.cpdpTotalAmmout.APIName = form.value.listofSearchedApis;
        this.cpdpTotalAmmout.FieldName = parts1[0];

        this.cpdpTotalAmmout.DataProvider = form.value.dataProviderVal;

        this.cpdpCurrencyType.DataSource = form.value.dataSources;
        this.cpdpCurrencyType.ConnectionProvider = form.value.connectionService;
        this.cpdpCurrencyType.ParameterName = parts2[1];
        this.cpdpCurrencyType.APIName = form.value.listofSearchedApis;
        this.cpdpCurrencyType.FieldName = parts2[0];

        this.cpdpCurrencyType.DataProvider = form.value.dataProviderVal;

        // this.cpdpHeaderDesc.DataSource = form.value.dataSources;
        // this.cpdpHeaderDesc.ConnectionProvider = form.value.connectionService;
        // this.cpdpHeaderDesc.ParameterName = parts3[1];
        // this.cpdpHeaderDesc.APIName = form.value.listofSearchedApis;
        // this.cpdpHeaderDesc.FieldName = parts3[0];

        // this.cpdpHeaderDesc.DataProvider = form.value.dataProviderVal;

        this.cpdpPurchasingDoc.DataSource = form.value.dataSources;
        this.cpdpPurchasingDoc.ConnectionProvider = form.value.connectionService;
        this.cpdpPurchasingDoc.ParameterName = parts4[1];
        this.cpdpPurchasingDoc.APIName = form.value.listofSearchedApis2;
        this.cpdpPurchasingDoc.FieldName = parts4[0];

        this.cpdpPurchasingDoc.DataProvider = form.value.headerDataProviderVal;

        this.cpdpPurchasingOrg.DataSource = form.value.dataSources;
        this.cpdpPurchasingOrg.ConnectionProvider = form.value.connectionService;
        this.cpdpPurchasingOrg.ParameterName = parts5[1];
        this.cpdpPurchasingOrg.APIName = form.value.listofSearchedApis2;
        this.cpdpPurchasingOrg.FieldName = parts5[0];

        this.cpdpPurchasingOrg.DataProvider = form.value.headerDataProviderVal;

        this.cpdpPurchasingVendor.DataSource = form.value.dataSources;
        this.cpdpPurchasingVendor.ConnectionProvider = form.value.connectionService;
        this.cpdpPurchasingVendor.ParameterName = parts6[1];
        this.cpdpPurchasingVendor.APIName = form.value.listofSearchedApis2;
        this.cpdpPurchasingVendor.FieldName = parts6[0];

        this.cpdpPurchasingVendor.DataProvider = form.value.headerDataProviderVal;

        console.log(form.value.vendorVal)

        console.log("field 1 object...");
        console.log(this.cpdpTotalAmmout)
        console.log("field 2 object...");
        console.log(this.cpdpCurrencyType)
        // console.log("field 3 object...");
        // console.log(this.cpdpHeaderDesc)

        
        //create function todo
        let cpdpPurchasingDocDPConfig: Array<any> = JSON.parse(this.cpdpPurchasingDoc.DPConfig);
        cpdpPurchasingDocDPConfig[0].label = form.value.purchasingDocVal;
        cpdpPurchasingDocDPConfig[0].uifieldtype = form.value.headerPurchasingDocType
        this.cpdpPurchasingDoc.DPConfig = JSON.stringify(cpdpPurchasingDocDPConfig[0]);

        //create function todo        
        let cpdpPurchasingOrgDPConfig = JSON.parse(this.cpdpPurchasingOrg.DPConfig);
        cpdpPurchasingOrgDPConfig[0].label = form.value.purchasingOrgVal;
        cpdpPurchasingOrgDPConfig[0].uifieldtype = form.value.headerPurchasingOrgType
        this.cpdpPurchasingOrg.DPConfig = JSON.stringify(cpdpPurchasingOrgDPConfig[0]);

        //create function todo
        let cpdpPurchasingVendorDPConfig = JSON.parse(this.cpdpPurchasingVendor.DPConfig);
        cpdpPurchasingVendorDPConfig[0].label = form.value.vendorVal;
        cpdpPurchasingVendorDPConfig[0].uifieldtype = form.value.headerVendorType
        this.cpdpPurchasingVendor.DPConfig = JSON.stringify(cpdpPurchasingVendorDPConfig[0]);

        console.log("field 4 object...");
        console.log(this.cpdpPurchasingDoc)
        console.log("field 5 object...");
        console.log(this.cpdpPurchasingOrg)
        console.log("field 6 object...");
        console.log(this.cpdpPurchasingVendor)


        //Calls
        this.postallObjects(
            this.cpdpTotalAmmout,
            this.cpdpCurrencyType,
            this.cpdpPurchasingDoc,
            this.cpdpPurchasingOrg,
            this.cpdpPurchasingVendor
        )
    }
}