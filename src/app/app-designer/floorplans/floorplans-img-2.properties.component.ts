import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDesignerJSON }  from '../globals';

declare var jQuery: any;

@Component({
  selector: 'app-floorplans-img-2-properties',
  template: `
      
  <div class="frame">
    <a href="javascript:void(0)" class="legend" (click)="showProperties()">Properties</a>
        <div class="fp2">
            <header class="fp2__header" [ngStyle]="{'background-color':  headerBG.value}">
                <div class="fp2__top">
                    <div class="pull-left">
                        <span [ngStyle]="{'color': icons.value }" class="glyphicon glyphicon-menu-left"></span>
                    </div>
                    <div class="pull-right">
                        <span [ngStyle]="{'color': icons.value }" class="glyphicon glyphicon-filter"></span>
                        <span [ngStyle]="{'color': icons.value }" class="glyphicon glyphicon-edit"></span>
                    </div>
                </div>
                <div class="fp2__name" [ngStyle]="{'color': pageTitleColor.value }">
                    {{pageTitle.value}}
                </div>
                <div class="clearfix"></div>
                <div class="fp2__desc" [ngStyle]="{'color': pageDescColor.value }">
                    {{pageDesc.value}}
                </div>
                <nav class="fp2__nav-container">
                    <ul class="fp2__nav" [ngStyle]="{'border-color': tabsBorderColor.value }">
                        <!--<li [ngStyle]="{'border-color': tabsBorderColor.value }" class="fp2__nav-item" [ngClass]="{active: i==0}" *ngFor="let tab of tabs; let i=index">
                            <a href=".collapse{{i}}" class="fp2__nav-link" data-toggle="tab">{{tab}}</a>
                        </li>-->
                        <li [ngStyle]="{'border-color': tabsBorderColor.value }" class="fp2__nav-item active"><a [ngStyle]="{'color': tabTextColor.value }" href=".collapse1" class="fp2__nav-link" data-toggle="tab">{{tab1.value}}</a></li>
                        <li [ngStyle]="{'border-color': tabsBorderColor.value }" class="fp2__nav-item"><a [ngStyle]="{'color': tabTextColor.value }" href=".collapse2" class="fp2__nav-link" data-toggle="tab">{{tab2.value}}</a></li>
                        <li [ngStyle]="{'border-color': tabsBorderColor.value }" class="fp2__nav-item"><a [ngStyle]="{'color': tabTextColor.value }" href=".collapse3" class="fp2__nav-link" data-toggle="tab">{{tab3.value}}</a></li>
                        <li [ngStyle]="{'border-color': tabsBorderColor.value }" class="fp2__nav-item"><a [ngStyle]="{'color': tabTextColor.value }" href=".collapse4" class="fp2__nav-link" data-toggle="tab">{{tab4.value}}</a></li>
                    </ul>
                </nav>
            </header>
            <div class="fp2__search-bar">
                <input type="text" class="fp2__search-input" placeholder="{{searchScan.value}}" />
                <span [ngStyle]="{'color': searchScanColor.value }" class="glyphicon glyphicon-qrcode fp2__search-icon"></span>
            </div>
            <div class="fp2__body">
                <div class="tab-content clearfix">

                    <div class="tab-pane active collapse1">
                        <ul class="fp2__list-container">
                            <li class="fp2__list-item">
                            <div class="row">
                                <div class="col-md-2">
                                    <input type="radio" />
                                </div>
                                <div class="col-md-10 fp2__body-container">
                                    <p class="fp2__body-text" *ngIf="lineItemNameValue==true">GNA Constructions</p>
                                    <p class="fp2__body-text" *ngIf="lineItemContractValue==true">Contract no: 13214</p>
                                    <p class="fp2__body-text" *ngIf="lineItemDateValue==true">Agreement Date: Jan 21, 2017</p>
                                </div>
                                </div>
                            </li>
                            <li class="fp2__list-item">
                             <div class="row">
                                <div class="col-md-2">
                                    <input type="radio" />
                                </div>
                                <div class="col-md-10 fp2__body-container">
                                    <p class="fp2__body-text" *ngIf="lineItemNameValue==true">GNA Constructions</p>
                                    <p class="fp2__body-text" *ngIf="lineItemContractValue==true">Contract no: 13214</p>
                                    <p class="fp2__body-text" *ngIf="lineItemDateValue==true">Agreement Date: Jan 21, 2017</p>
                                </div>
                                </div>
                            </li>
                            <li class="fp2__list-item">
                             <div class="row">
                                <div class="col-md-2">
                                    <input type="radio" />
                                </div>
                                <div class="col-md-10 fp2__body-container">
                                    <p class="fp2__body-text" *ngIf="lineItemNameValue==true">GNA Constructions</p>
                                    <p class="fp2__body-text" *ngIf="lineItemContractValue==true">Contract no: 13214</p>
                                    <p class="fp2__body-text" *ngIf="lineItemDateValue==true">Agreement Date: Jan 21, 2017</p>
                                </div>
                                </div>
                            </li>
                        </ul>                            
                    </div>

                    <div class="tab-pane collapse2">
                        <p>Master</p>
                    </div>

                    <div class="tab-pane collapse3">
                        <p>Ad-Hoc</p>
                    </div>

                    <div class="tab-pane collapse4">
                        <p>Templates</p>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
        <form #floorplan2Form="ngForm" (ngSubmit)="addFloorplan2Properties(floorplan2Form)">
             <div class="tabs__buttons">
                <button class="btn btn-warning btn-sm" *ngIf="updated == true" type="submit" (click)="showProperties()">Update</button>
                <button class="btn btn-primary btn-sm" *ngIf="updated == false" type="submit" (click)="showProperties()">Done</button>
                <span class="pull-right tabs__close-icon glyphicon glyphicon-remove-circle" (click)="showProperties()"></span>                  
            </div>
            
             <div class="form-group" style="padding-top: 50px;">
                <label class="tabs__form-label" for="headerBG">Header Background</label>
                <input type="color" value="#435F73" class="f2__input-color" name="headerBG" #headerBG [ngModel]="headerBG.value">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="icons">Icons (Back button, Filter, Edit)</label>
                <input type="color" value="#87A4B8" class="f2__input-color" name="icons" #icons [ngModel]="icons.value">
            </div>

             <div class="form-group">
                <label class="tabs__form-label" for="pageTitleColor">Page Title / color</label>
                <input type="color" value="#87A4B8" class="f2__input-color" name="pageTitleColor" #pageTitleColor [ngModel]="pageTitleColor.value">
                <input type="text" value="Foundation Layer" class="form-control" name="pageTitle" #pageTitle [ngModel]="pageTitle.value">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="pageDescColor">Page Description / color</label>
                <input type="color" value="#87A4B8" class="f2__input-color" name="pageDescColor" #pageDescColor [ngModel]="pageDescColor.value">
                <input type="text" value="Enter services from one of the following" class="form-control" name="pageDesc" #pageDesc [ngModel]="pageDesc.value">
            </div>

             <div class="form-group">
                <label class="tabs__form-label" for="tabsBorderColor">Tabs border</label>
                <input type="color" value="#87A4B8" class="f2__input-color" name="tabsBorderColor" #tabsBorderColor [ngModel]="tabsBorderColor.value">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="tabTextColor">Tab text color</label>
                <input type="color" value="#87A4B8" class="f2__input-color" name="tabTextColor" #tabTextColor [ngModel]="tabTextColor.value">
            </div>
            
            <div class="form-group">
                <label class="tabs__form-label" for="tab1">Tab 1</label>
                <input type="text" value="Controls" class="form-control" name="tab1" #tab1 [ngModel]="tab1.value">
            </div>
            
            <div class="form-group">
                <label class="tabs__form-label" for="tab2">Tab 2</label>
                <input type="text" value="Master" class="form-control" name="tab2" #tab2 [ngModel]="tab2.value">
            </div>
            
            <div class="form-group">
                <label class="tabs__form-label" for="tab3">Tab 3</label>
                <input type="text" value="Ad-Hoc" class="form-control" name="tab3" #tab3 [ngModel]="tab3.value">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="tab4">Tab 4</label>
                <input type="text" value="Templates" class="form-control" name="tab4" #tab4 [ngModel]="tab4.value">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="searchScan">Search Scan</label>
                <input type="color" value="#3179AA" class="f2__input-color" name="searchScanColor" #searchScanColor [ngModel]="searchScanColor.value">
                <input type="text" value="Search/Scan" class="form-control" name="searchScan" #searchScan [ngModel]="searchScan.value">
            </div>

             <div class="form-group">
                <input type="checkbox" name="lineItemName" #lineItemName [(ngModel)]="lineItemNameValue" />
                <label class="tabs__form-label" for="lineItemName" *ngIf="lineItemNameValue==false">Show name</label>
                <label class="tabs__form-label" for="lineItemName" *ngIf="lineItemNameValue==true">Don't show name</label>
            </div>

             <div class="form-group">
                <input type="checkbox" name="lineItemContract" #lineItemContract [(ngModel)]="lineItemContractValue" />
                <label class="tabs__form-label" for="lineItemContract" *ngIf="lineItemContractValue==false">Show Contract number</label>
                <label class="tabs__form-label" for="lineItemContract" *ngIf="lineItemContractValue==true">Don't show Contract number</label>
            </div>

             <div class="form-group">
                <input type="checkbox" name="lineItemDate" #lineItemDate [(ngModel)]="lineItemDateValue" />
                <label class="tabs__form-label" for="lineItemDate" *ngIf="lineItemDateValue==false">Show Date</label>
                <label class="tabs__form-label" for="lineItemDate" *ngIf="lineItemDateValue==true">Don't show Date</label>
            </div>
            
        </form>

       <!-- <div class="form-group">
                <label class="tabs__form-label" for="tabs">Tabs</label>
                
                <json-schema-form
                [form]="mySchema"
                (onChanges)="onChanges($event)"
                (onSubmit)="onSubmit($event)">
                </json-schema-form>
                
                <pre>{{prettyLiveFormData}}</pre>

            </div>-->


    </div>
  `,
  styles:[`

    .tabs__properties{
        position: fixed;
        top: 90px;
        right: 0;
        width: 29.2%;
        z-index: 12;
        background: #fff;
        padding: 10px;
        height: calc( 100% - 120px );
        overflow: auto;
    }
    .frame{
        border: solid 2px #bd8d1b;
    }
    .legend{
        position: absolute;
        font-size: 9px;
        color: #fff;
        background: #bd8d1b;
        padding: 3px 5px;
        text-transform: uppercase;
        letter-spacing: 1px;
        left: 50%;
        transform: translate(-50%, -18px);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    .legend:hover{
        text-decoration: none;
    }
    .legend:focus{
        background: #e6930b;
        text-decoration: none;
    }
    .legend:hover .frame{
        border: solid 2px #e6930b;
    }

    .fp2{
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: center;
        letter-spacing: 0.5px;
    }
    .fp2__header{
        background: #435F73;
        min-height: 100px;
        color: #87A4B8;
        padding: 10px;
        font-size: 12px;
    }
    .fp2__nav{
        border: solid 1px #87A4B8;
        text-align: left;
        margin: 0;
        padding: 0;
        display: table;
        width: 100%;
        border-radius: 5px;

    }
    .fp2__nav-item{
        list-style: none;
        display: inline-block;
        text-align: center;
        display: table-cell;
        border-right: solid 1px #87A4B8;
    }
    .fp2__nav-item.active .fp2__nav-link{
        /*background: #C8E5F9;
        color: #476276;*/
        
    }
    .fp2__nav-item:last-child{
        border:0;
    }
    .fp2__nav-link{
        color: #87A4B8;
        font-size: 9px;
        line-height: 25px;
        display: block;
        
    }
    .fp2__nav-link:hover, .fp2__nav-link:visited, .fp2__nav-link:focus{
        text-decoration: none;
    }

    .fp2__top{
    }
    .fp2__name{
        color: #87A4B8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 15px;
    }
    .fp2__desc{
        padding: 10px 0;
        color: #CED5DA;
        line-height: 16px;
    }
    .fp2__search-bar{
        background: #ccc;
        padding: 5px;
        position: relative;

    }
    .fp2__search-input{
        border-radius: 5px;
        border: 0;
        padding: 2px;
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
    .fp2__search-icon{
        position: absolute;
        top: 9px;
        right: 10px;
        color: #3179AA;
    }
    .fp2__list-container{
        padding: 0;
        margin: 0;
    }
    .fp2__list-item{
        list-style: none;
        text-align: left;
        border-bottom: solid 1px #ccc;
        padding: 10px 10px 0px 10px;
    }
    .f2__input-color{
        height: 22px;
        width: 22px;
        padding: 0;
        border: 0;
        background: none;
    }
    .fp2__body-container{
        padding-bottom: 10px;
    }
    .fp2__body-text{
        margin: 0;
        font-size: 12px;
        color: #666;
    }

  `]

})

export class FloorPlansImg2ComponentProperties {

    public updated: boolean = false;
    public fileName: string = 'default-logo.png'; 
    public showPropertyPanel: boolean = false;
    floorPlan2: Array<any> = [{"id": "fp2", "name": "floorPlan2", "properties": [] }];
    locations: any;
    lineItemNameValue: boolean = true;
    lineItemContractValue: boolean = true;
    lineItemDateValue: boolean = true;
   //tabs: Array<any> = [{"name": "Contracts"},{"name":"Master"},{ "name":"Ad-Hoc"}, {"name":"Templates"}]
    tabs: Array<any> = ["Contracts", "Master", "Ad-Hoc", "Templates"]
    hoverColor: string;
    color: string;
    constructor(){

    }

  mySchema = {
    "type": "object",
    "properties": {
      "page_title": { "type": "string" },
      "page_desc": { "type": "string" },
      "page_header_color": { "type": "file" },
      "address": {
        "type": "object",
        "properties": {
          "street_1": { "type": "string" },
          "street_2": { "type": "string" },
          "city": { "type": "string" },
          "state": { "type": "string" },
          "zip_code": { "type": "string" }
        }
      },
      "phone_numbers": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "number": { "type": "string" }
          },
          "required": [ "number", "type" ]
        }
      }
    },
  "data": {
    "page_title": "Foundation Layer",
    "page_desc": "Enter services from one of the following",
    "page_header_color": null,
    "address": {
      "street_1": "123 Main St.",
      "street_2": null,
      "city": "Las Vegas",
      "state": "NV",
      "zip_code": "89123"
    },
    "phone_numbers": [
      { "number": "702-123-4567", "type": "cell" },
      { "number": "702-987-6543", "type": "work" }
    ]
  }
  }

    showProperties(){
        this.showPropertyPanel =! this.showPropertyPanel;
    }

    addFloorplan2Properties(form: NgForm){
        this.updated = true;

        //adding to object
        this.floorPlan2[0].properties.shift();
        this.floorPlan2[0].properties.push(form.value);
        //adding to global

        let test = this.getFloorplansByID('fp1');
        
         if(test.length > 0){
            if(test[0].id=='fp1'){
                console.log("fp1 found need to update")
            }
        }else{
            AppDesignerJSON.data.push(this.floorPlan2[0]);
        }    
        console.log(JSON.stringify(AppDesignerJSON.data));
    }

    getFloorplansByID(code) {
        return AppDesignerJSON.data.filter(
            function(data){return data.id == code}
        );
    }

    // submittedFormData: any = {};
    // liveFormData: any = {};

    // onSubmit(data: any) {
    //     this.submittedFormData = data;
    //     console.log(JSON.stringify(this.liveFormData));
    // }

    // get prettySubmittedFormData() {
    //     return JSON.stringify(this.submittedFormData, null, 2);
    // }

    // onChanges(data: any) {
    //     this.liveFormData = data;
    // }

    // get prettyLiveFormData() {
    //     return JSON.stringify(this.liveFormData, null, 2);
    // }
}
