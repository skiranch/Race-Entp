import { Component, NgModule } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON }  from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

import { Floorplan1UIPostService } from './services/floorplan1UI-post.service'


declare var jQuery: any;

@Component({
  templateUrl: `./fp1.component.html`,
  styleUrls:['./scss/fp.component.scss'],
  providers: [Floorplan1UIPostService]
})

export class FP1Component {

    loading: boolean;
    success: boolean = false;
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
                            this.success = true;
                            
                            setTimeout(() => {
                                this.success = false;
                            }, 5000);
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