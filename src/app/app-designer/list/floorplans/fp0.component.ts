import { Component, NgModule } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON }  from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  template: `
      
  <div class="frame">
    <a href="javascript:void(0)" class="legend" (click)="showProperties()">Properties</a>
        <div class="fp2">
            <header class="fp2__header" [ngStyle]="{'background-color':  floorplan.HeaderColor }">
                <div class="fp2__top">
                    <div class="pull-left">
                        <span (click)="gotBack()" [ngStyle]="{'color': floorplan.HeaderIconsColor }" class="glyphicon glyphicon-menu-left"></span>
                    </div>
                    <div class="pull-right">
                        <span [ngStyle]="{'color': floorplan.HeaderIconsColor }" class="glyphicon glyphicon-filter"></span>
                        <span [ngStyle]="{'color': floorplan.HeaderIconsColor }" class="glyphicon glyphicon-edit"></span>
                    </div>
                </div>
                <div class="fp2__name" [ngStyle]="{'color': floorplan.PageTitleColor }">
                    {{floorplan.PageTitle}}
                </div>
                <div class="clearfix"></div>
                <div class="fp2__desc">
                    Header description
                </div>
                <nav class="fp2__nav-container">
                
                    <ul class="fp2__nav">
                       <li *ngFor="let tab of floorplan.tabs; let i=index" class="fp2__nav-item"><a  href="#collapse_{{i}}" class="fp2__nav-link" data-toggle="tab">{{tab.name}}</a></li>
                    </ul>
                </nav>
            </header>
            <div class="fp2__search-bar">
                <input type="text" class="fp2__search-input" placeholder="Search/scan" />
                <span class="glyphicon glyphicon-qrcode fp2__search-icon"></span>
            </div>
            <div class="fp2__body">
                <div class="tab-content clearfix">

                    <div class="tab-pane active" id="collapse_0">
                        <ul class="fp2__list-container">
                            <li class="fp2__list-item" *ngFor="let body of floorplan.body; let x=index">
                            <div class="row">
                                <div class="col-md-2">
                                    <input type="radio" />
                                </div>
                                <div class="col-md-10 fp2__body-container">
                                    <p class="fp2__body-text">{{body.contractName}}</p>
                                    <p class="fp2__body-text">
                                        {{body.contractNumberLabel}} 
                                        {{body.contractNumber}} 
                                    </p>
                                    <p class="fp2__body-text">
                                        {{body.agreementDateLabel}} 
                                        {{body.agreementDate}} 
                                    </p>
                                </div>
                                </div>
                            </li>

                            <!--<li class="fp2__list-item">
                             <div class="row">
                                <div class="col-md-2">
                                    <input type="radio" />
                                </div>
                                <div class="col-md-10 fp2__body-container">
                                    <p class="fp2__body-text" >GNA Constructions</p>
                                    <p class="fp2__body-text" >Contract no: 13214</p>
                                    <p class="fp2__body-text" >Agreement Date: Jan 21, 2017</p>
                                </div>
                                </div>
                            </li>

                             <li class="fp2__list-item">
                             <div class="row">
                                <div class="col-md-2">
                                    <input type="radio" />
                                </div>
                                <div class="col-md-10 fp2__body-container">
                                    <p class="fp2__body-text" >GNA Constructions</p>
                                    <p class="fp2__body-text" >Contract no: 13214</p>
                                    <p class="fp2__body-text" >Agreement Date: Jan 21, 2017</p>
                                </div>
                                </div>
                            </li>-->

                        </ul>                            
                    </div>

                    <div class="tab-pane" id="collapse_1">
                        <p>Master</p>
                    </div>

                    <div class="tab-pane" id="collapse_2">
                        <p>Ad-Hoc</p>
                    </div>

                    <div class="tab-pane" id="collapse_3">
                        <p>Templates</p>
                    </div>

                </div>
            </div>
            <app-fp-footer></app-fp-footer>
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
       <form class="formly" role="form" novalidate [formGroup]="form" (ngSubmit)="submit(floorplan)">
            <div class="tabs__buttons">
                <button class="btn btn-primary btn-sm" type="submit" (click)="showProperties()">Done</button>
                <button class="btn btn-sm btn-danger" type="button" (click)="removeFloorplan()">Remove</button>
                <span class="pull-right tabs__close-icon glyphicon glyphicon-remove-circle" (click)="showProperties()"></span>
            </div>
            <div style="padding-top: 40px;">
                <formly-form [model]="floorplan" [fields]="floorplan_form"></formly-form>
            </div>
        </form>
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
        height: 100%;
    }

    .fp2__footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-top: solid 1px #ccc;
        
    }
    .fp2__footer-container{
        margin: 0;
        padding: 0;
    }
    .fp2__footer-item{
        float: left;
        width: 25%;
        text-align: center;
        list-style: none;
    }
     .fp2__footer-link{
        color: #999;
        font-size: 9px;
        line-height: 10px;
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
        position: relative;
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
        background: #fff;
    }
    .f2__input-color{
        height: 22px;
        width: 22px;
        padding: 0;
        border: 0;
        background: none;
    }
    .fp2__body{
        height: 207px;
        overflow-y: auto;
        background: #eee;
        margin-bottom: 40px;
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

export class FP0Component {

    form: FormGroup = new FormGroup({});
    floorplan_form: Array<FormlyFieldConfig> = [{
    className: 'floorplan-form',
    fieldGroup: [
        {
        className: 'color-input',
        key: 'HeaderColor',
        type: 'input',
        templateOptions: {
            type: 'color',
            label: 'Header Background'
        }
    }, 
    {
        className: 'color-input',
        key: 'HeaderIconsColor',
        type: 'input',
        templateOptions: {
            type: 'color',
            label: 'Icons (Back button, Filter, Edit)'
        }
    },
    {
        className: 'color-input',
        key: 'PageTitleColor',
        type: 'input',
        templateOptions: {
            type: 'color',
            label: 'Page Title color'
        }
    },{
        className: '',
        key: 'PageTitle',
        type: 'input',
        templateOptions: {
            type: 'text',
            label: 'Page Title'
        }
    },
    {
        key: 'dataProvider',
        type: 'select',
        templateOptions: {
            options: [{
              label: 'data_provider_12',
              value: 'data_provider_12',
            }, {
              label: 'data_provider_13',
              value: 'data_provider_13',
            },
            {
              label: 'data_provider_14',
              value: 'data_provider_14',
            }],
            label: 'Select Data provider'
          },
    },
    {
      type:'repeatSection',
      key:'tabs',
      fieldArray:{  
         className:'row',
         templateOptions:{  
            btnText:'Add another tab',

         },
         fieldGroup:[  
            {  
               className:'col-md-9',
               type:'input',
               key:'name',
               templateOptions:{  
                  label:'Name of Tab:',
                  required:true,

               },

            }

         ],

      }
    }
]
  }];


floorplan =
    {
        "id": 1,
        "title": "floorplan_title",
        "name": "floorplan_name",
        "HeaderColor": "#435F73",
        "HeaderIconsColor": "#87A4B8",
        "PageTitleColor": "#87A4B8",
        "PageTitle": "Foundation Layer",
        "dataProvider": "data_provider_12",
        "header": {},
        "tabs": 
            [
              {
                  "name": "Controls",
              },
              {
                  "name": "master",
             },
              {
                  "name": "Ad-Hoc",
              },
              {
                  "name": "Templates",

              }
            ],
        "body": 
            [
              {
                  "contractName": "GNA Constructions 1",
                  "contractNumberLabel":"Contract no: ",
                  "contractNumber":"2345",
                  "agreementDateLabel": "Agreement Date",
                  "agreementDate": "Jan 21, 2017"
              },
                 {
                  
                  "contractName": "GNA Constructions 2",
                  "contractNumberLabel":"Contract no: ",
                  "contractNumber":"2345",
                  "agreementDateLabel": "Agreement Date",
                  "agreementDate": "Jan 21, 2017"
              },
                 {
                  
                  "contractName": "GNA Constructions 3",
                  "contractNumberLabel":"Contract no: ",
                  "contractNumber":"2345",
                  "agreementDateLabel": "Agreement Date",
                  "agreementDate": "Jan 21, 2017"
              }
            ],
          
        "footer":{
            
        }
    }

    
    submit(floorplan) {
       //this.floorPlan2[0].properties.push(JSON.stringify(fp1_properties));
        console.log(JSON.stringify(this.floorplan));


    }

    private updated: boolean = false;
    private fileName: string = 'default-logo.png'; 
    public showPropertyPanel: boolean = false;

    constructor(private router: Router){}

    showProperties(){
        this.showPropertyPanel =! this.showPropertyPanel;
    }

    gotBack(){
        this.router.navigateByUrl('app-designer/list/ui/fp1');
    }
    removeFloorplan(){
        let r = confirm("Are you sure ?");
        if (r == true) {
            this.router.navigateByUrl('app-designer/list/ui');
        }
    }

}