import { Component, NgModule } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON }  from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

import { Floorplan1UIPostService } from './services/floorplan1UI-post.service'


declare var jQuery: any;

@Component({
  template: `
  <div class="frame">
  <span class="frame__prev glyphicon glyphicon-triangle-right" (click)="gotToNextScreen()">Next</span>
  <!--<span class="frame__next glyphicon glyphicon-triangle-left">Prev</span>-->
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
                    {{title.value}}
                </div>
            </header>
            <nav class="floorplan__nav">
                    
                <ul class="floorplan__nav-container">
                    <li class="floorplan__nav-item floorplan__nav-item--active"><a class="floorplan__nav-link" href="#">{{tabOne.value}}</a><span class="floorplan__nav-step">1</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="#">{{tabTwo.value}}</a><span class="floorplan__nav-step">2</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="#">{{tabThree.value}}</a><span class="floorplan__nav-step">3</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="#">{{tabFour.value}}</a><span class="floorplan__nav-step">4</span></li>
                </ul>
            </nav>
            <div class="floorplan__guide">
                <h4 class="floorplan__guide-heading">Submit service confirmation in 4 steps</h4>
                <p class="floorplan__guide-desc">Start by searching for the service order</p>
            </div>

            <div class="floorplan__search-bar" style="margin-top: -10px;">
                <input type="text" class="floorplan__search-input" placeholder="Search/Scan" />
                <span class="icon-Scan2 floorplan__icon-Scan2"></span>
            </div>
            <div class="floorplan__body">
                
            </div>
            <app-fp-footer></app-fp-footer>
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
         <app-loading *ngIf="loading===true"></app-loading>

         <form #floorplanForm="ngForm" (ngSubmit)="onSubmit(floorplanForm)">
            
            <div class="tabs__buttons">
                <button class="btn btn-primary btn-sm" type="button" (click)="showProperties()">Done</button>
                <button class="btn btn-sm btn-danger" type="button" (click)="removeFloorplan()">Remove</button>
                <span class="pull-right tabs__close-icon glyphicon glyphicon-remove-circle" (click)="showProperties()"></span>
            </div>
            
            <div class="form-group" style="padding-top: 40px;">
                <label class="tabs__form-label" for="title">Title</label>
                <input type="text" value="Scan service order" class="form-control" name="title" #title [ngModel]="title.value" /> 
            </div>

            <!--<div class="form-group">
                <label class="tabs__form-label" for="titleColor">Title Color</label>
                <input type="color" value="#87A4B8" class="floorplan__input-small" name="titleColor" #titleColor [ngModel]="titleColor.value" /> 
            </div>-->

             <div class="form-group">
                <label class="tabs__form-label" for="headerColor">Header Color</label>
                <input type="color" value="#435F73" class="floorplan__input-small" name="headerColor" #headerColor [ngModel]="headerColor.value" /> 
            </div>

            <!--<div class="form-group">
                <label class="tabs__form-label" for="headerIconsColor">Header Icons Color</label>
                <input type="color" value="#87A4B8" class="floorplan__input-small" name="headerIconsColor" #headerIconsColor [ngModel]="headerIconsColor.value" /> 
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="tabsColor">Tabs Color</label>
                <input type="color" value="#337ab7" class="floorplan__input-small" name="tabsColor" #tabsColor [ngModel]="tabsColor.value" /> 
            </div>-->

            <div class="form-group">
                <label class="tabs__form-label" for="tabsColor">Tabs</label>
                <input type="text" value="Find order" class="form-control" name="tabOne" #tabOne [ngModel]="tabOne.value" /> 
            </div>
            <div class="form-group">
                <input type="text" value="Enter services" class="form-control" name="tabTwo" #tabTwo [ngModel]="tabTwo.value" /> 
            </div>
            <div class="form-group">
                <input type="text" value="Attch notes & media" class="form-control" name="tabThree" #tabThree [ngModel]="tabThree.value" /> 
            </div>
            <div class="form-group">
                <input type="text" value="Confirm" class="form-control" name="tabFour" #tabFour [ngModel]="tabFour.value" /> 
            </div>

            <button class="btn btn-primary col-md-12" type="submit">Submit</button>
            
       </form>
    </div>
  `,
  styleUrls:['./scss/fp.component.scss'],
  providers: [Floorplan1UIPostService]
})

export class FP1Component {
    
    loading: boolean;
    public showPropertyPanel: boolean = false;

    constructor(
        private router: Router,
        private _floorplan1UIPostService : Floorplan1UIPostService
    ){
        
    }
    floorplan = 
        {
            "id": "floorplan_id",
            "title": "floorplan_title",
            "name": "floorplan_name",
            "header":{
                "title": "Service Confirmation",
                "titleColor": "#87A4B8"
            },
            "body":{
                
            },
            "footer":{}
        }

        FPConfigWrapper = {  
            "AppID":"MINVENTORY",
            "ModuleID":"SES_CONF",
            "FPID":"FP_06_SOS_01_Search",
            "FPName":"Floor Plan 2",
            "Status":"X",
            "FPConfg":""
        }

        floorplan_new = {
            
            "id": 1,
            "floorName": "FP_06_SOS_01_Search",
            "pageTitle": "Services Order",
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
                    "dataprovider":"",
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
                    },
                    {"elementTitle":"Submit Service Confirmation in 4 Steps",
                    "position":5,
                    "style":"",
                    "componentCategory":"LABEL",
                    "componentType":"HEADERLABEL",
                    "dataprovider":"",
                    "dataproviderType":"",
                    "dpParameters":"",
                    "navigation":""
                    },
                    {"elementTitle":"Start by Searching for the Service Order",
                    "position":6,
                    "style":"",
                    "componentCategory":"LABEL",
                    "componentType":"SUBHEADERLABEL",
                    "dataprovider":"",
                    "dataproviderType":"",
                    "dpParameters":"",
                    "navigation":""
                    },
                    {"elementTitle":"Search/Scan",
                    "position":7,
                    "style":"",
                    "componentCategory":"SEARCHBAR",
                    "componentType":"SEARCHBAR",
                    "dataprovider":"",
                    "dataproviderType":"",
                    "dpParameters":"",
                    "navigation":""
                    }
                    
                    ],
            
            "footer": [
            
                       {"elementTitle":"Search/ Scan",
                       "position":1,
                       "style":"{'textColor':'','selectionColor':''}",
                       "componentCategory":"TABBARITEM",
                       "componentType":"Search",
                       "dataprovider":"",
                       "dataproviderType":"GET",
                       "dpParameters":"",
                       "navigation":"FP_06_SOS_01_Search"
                       },
                       {"elementTitle":"Orders",
                       "position":2,
                       "style":"{'textColor':'','selectionColor':''}",
                       "componentCategory":"TABBARITEM",
                       "componentType":"Orders",
                       "dataprovider":"",
                       "dataproviderType":"GET",
                       "dpParameters":"",
                       "navigation":"FP_07_DOL_01"
                       }
            ]
            
        }
        

    showProperties(){
        this.showPropertyPanel =! this.showPropertyPanel;
    }

    gotToNextScreen(){
        this.router.navigateByUrl('app-designer/list/ui/fp2');
    }

    removeFloorplan(){
        let r = confirm("Are you sure ?");
        if (r == true) {
            this.router.navigateByUrl('app-designer/list/ui');
        }
    }

    postUIObject($uiObj){
        
        console.log('initiating..');

        this.loading = true;
        let _token:string = '';
        let _status;
        this._floorplan1UIPostService.getTokenData().subscribe(
            data => 
                _token = data
            ,
            error => console.log(error),
            () => {
                if(_token !== ''){
                    
                    this._floorplan1UIPostService.doPost($uiObj, _token).subscribe(
                        ()=> {
                            this.loading = false;
                        }
                    )
                }
            }
        )
    }

    onSubmit(form: NgForm){

        this.floorplan_new.pageTitle = form.value.title
        //this.floorplan_new.pageTitleColor = form.value.titleColor;
        this.floorplan_new.headerColor = form.value.headerColor;
        //this.floorplan_new.headerIconsColor = form.value.headerIconsColor
        this.floorplan_new.body[0].elementTitle = form.value.tabOne
        this.floorplan_new.body[1].elementTitle = form.value.tabTwo
        this.floorplan_new.body[2].elementTitle = form.value.tabThree
        this.floorplan_new.body[3].elementTitle = form.value.tabFour
        this.FPConfigWrapper.FPConfg = JSON.stringify(this.floorplan_new)
        
        console.log(this.floorplan_new);
        this.postUIObject(JSON.stringify(this.FPConfigWrapper))
    }
}