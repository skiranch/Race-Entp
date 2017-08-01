import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDesignerJSON }  from '../globals';

declare var jQuery: any;

@Component({
  selector: 'app-floorplans-img-1-properties',
  template: `
      
  <div class="" (click)="showProperties()">
        <div class="floorplan1">
            <img class="floorplan1__logo img-circle"  src="../../../../assets/img/floorplans/default/{{fileName}}" />
            <div class="floorplan1__name" [ngStyle]="{'color': floorplan1TitleColor.value }">{{floorplan1Title.value}}</div>
            <input class="floorplan1__text" type="text" placeholder="username" [ngStyle]="{'border-color': floorplan1FormBC.value }" /> 
            <input class="floorplan1__pwd" type="password" placeholder="password" [ngStyle]="{'border-color': floorplan1FormBC.value }" /> 
            <div>
            <button class="floorplan1__btn" [ngStyle]="{'background-color': floorplan1FormBBG.value, 'color': floorplan1FormBTC.value }">Activate</button>
            </div>
            <a href="javascript:void(0);" [ngStyle]="{'color': floorplan1FormLinkTC.value }" class="floorplan1__link">English Language</a>
            <a href="javascript:void(0);" [ngStyle]="{'color': floorplan1FormLinkTC.value }" class="floorplan1__link">Settings</a>
            <img class="floorplan1__powered-by"  src="../../../../assets/img/floorplans/default/powered-by-logo.png" />
            
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
        <form #floorplan1Form="ngForm" (ngSubmit)="addFloorplan1Properties(floorplan1Form)">
            <div class="tabs__buttons">
                <button class="btn btn-warning btn-sm" *ngIf="updated == true" type="submit" (click)="showProperties()">Update</button>
                <button class="btn btn-primary btn-sm" *ngIf="updated == false" type="submit" (click)="showProperties()">Done</button>
                <span class="pull-right tabs__close-icon glyphicon glyphicon-remove-circle" (click)="showProperties()"></span>                  
            </div>
            <div class="form-group" style="padding-top: 40px;">
                <label class="tabs__form-label" for="logo">Logo</label>
                <input type="file" value="" name="logo" #floorplan1Logo (change)="getFiles($event)" ngModel /> 
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="title">Title</label>
                <input type="text" value="Title" class="form-control" name="title" #floorplan1Title [ngModel]="floorplan1Title.value">
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="titleColor">Title color</label>
                <input type="color" value="#000000" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="titleColor" #floorplan1TitleColor [ngModel]="floorplan1TitleColor.value">
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="textfieldBorder">Border color</label>
                <input type="color" value="#3678AF" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="textfieldBorder" #floorplan1FormBC [ngModel]="floorplan1FormBC.value">
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="buttonBG">Button background</label>
                <input type="color" value="#3678AF" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="buttonBG" #floorplan1FormBBG [ngModel]="floorplan1FormBBG.value">
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="buttonTC">Button Text Color</label>
                <input type="color" value="#ffffff" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="buttonTC" #floorplan1FormBTC [ngModel]="floorplan1FormBTC.value">
            </div>
            <div class="form-group">
                <label class="tabs__form-label" for="linkTC">Link Color</label>
                <input type="color" value="#337AB9" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="linkTC" #floorplan1FormLinkTC [ngModel]="floorplan1FormLinkTC.value">
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
    .floorplan1{
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: center;
}
        .floorplan1__logo{
            width: 40%;
            min-height: 80px;
            margin: 12px 0;
        }
        .floorplan1__name{
            font-size: 30px;
            margin-bottom: 10px;
        }
        .floorplan1__text, .floorplan1__pwd{
            border: 0;
            border-bottom: solid 2px #3678AF;
            background: transparent;
            outline: none;
            text-align: center;
            margin-bottom: 10px;
            padding: 5px 0;
        }
        .floorplan1__btn{
            padding: 5px 10px;
            background: #3678AF;
            border-radius: 5px;
            color: #fff;
            border: 0;
            min-width: 100px;
            margin: 10px 0;
            
        }
        .floorplan1__link{
            display: block;
            margin-bottom: 10px;
        }
        .floorplan1__powered-by{
            max-width: 50%;    
        }
  `]

})

export class FloorPlansImg1ComponentProperties {

    public updated: boolean = false;
    public fileName: string = 'default-logo.png'; 
    public showPropertyPanel: boolean = false;
    floorPlan1: Array<any> = [{"id": "fp1", "name": "floorPlan1", "properties": [] }];
    locations: any;

    showProperties(){
        this.showPropertyPanel =! this.showPropertyPanel;
    }

    getFiles(fileInput: any){ 
        let file = fileInput.target.files[0];
        this.fileName = file.name;
    } 


    addFloorplan1Properties(form: NgForm){
        this.updated = true;
        form.value.logo = this.fileName;
        //adding to object
        this.floorPlan1[0].properties.shift();
        this.floorPlan1[0].properties.push(form.value);
        //adding to global

        let test = this.getFloorplansByID('fp1');
        
         if(test.length > 0){
            if(test[0].id=='fp1'){
                console.log("fp1 found need to update")
            }
        }else{
            AppDesignerJSON.data.push(this.floorPlan1[0]);
        }    
        console.log(JSON.stringify(AppDesignerJSON.data));
    }

    getFloorplansByID(code) {
        return AppDesignerJSON.data.filter(
            function(data){return data.id == code}
        );
    }
    
}
