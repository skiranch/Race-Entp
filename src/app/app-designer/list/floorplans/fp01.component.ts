import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppDesignerJSON }  from '../../globals';

declare var jQuery: any;

@Component({
  selector: 'FP2Component',
  template: `
      
  <div class="" (click)="showProperties()">
        <div class="floorplan">
            <img class="floorplan__logo img-circle"  src="../../../../assets/img/floorplans/default/{{floorplan.header.logo}}" />
            <div class="floorplan__name" [ngStyle]="{'color': titleColor.value }">{{title.value}}</div>
            <input class="floorplan__text" type="text" placeholder="username"  /> 
            <input class="floorplan__pwd" type="password" placeholder="password"  /> 
            <div>
            <button class="floorplan__btn" [ngStyle]="{'background-color': buttonBG.value, 'color': buttonLabelColor.value }">
             {{buttonLabel.value}}
            </button>
            </div>
            <a href="javascript:void(0);"  class="floorplan__link">English Language</a>
            <a href="javascript:void(0);"  class="floorplançç__link">Settings</a>
            <br/>
            <img class="floorplan__powered-by"  src="../../../../assets/img/floorplans/default/powered-by-logo.png" />
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
      <form #floorplanForm="ngForm" (ngSubmit)="onSubmit(floorplanForm)">
            
            <div class="tabs__buttons">
                <button class="btn btn-primary btn-sm"  (click)="showProperties()">Done</button>
                <span class="pull-right tabs__close-icon glyphicon glyphicon-remove-circle" (click)="showProperties()"></span>                  
            </div>
            
            <div class="form-group" style="padding-top: 40px;">
                <label class="tabs__form-label" for="logo">Logo</label>
                <input type="file" value="default-logo.png" name="logo" #logo (change)="getFiles($event)" ngModel /> 
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="title">Title</label>
                <input type="text" class="form-control" name="title" #title [ngModel]="floorplan.header.title">
            </div>

             <div class="form-group">
                <label class="tabs__form-label" for="titleColor">Title color</label>
                <input type="color"  class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="titleColor" #titleColor [ngModel]="floorplan.header.titleColor">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="buttonLabel">Button Label</label>
                <input type="text" class="form-control" name="buttonLabel" #buttonLabel [ngModel]="floorplan.body.buttonLabel">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="buttonBG">Button BG</label>
                <input type="color" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="buttonBG" #buttonBG [ngModel]="floorplan.body.buttonBG">
            </div>

            <div class="form-group">
                <label class="tabs__form-label" for="buttonLabelColor">Button label color</label>
                <input type="color" class="form-control input-sm" style="width: 50px; padding: 0; border: 0; border-radius: 0; box-shadow: none;" name="buttonLabelColor" #buttonLabelColor [ngModel]="floorplan.body.buttonLabelColor">
            </div>

            
        </form>
    </div>
  `,
  styles:
  [`
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
    .floorplan{
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: center;
      }
        .floorplan__logo{
            width: 40%;
            min-height: 80px;
            margin: 12px 0;
        }
        .floorplan__name{
            font-size: 30px;
            margin-bottom: 10px;
        }
        .floorplan__text, .floorplan__pwd{
            border: 0;
            border-bottom: solid 2px #3678AF;
            background: transparent;
            outline: none;
            text-align: center;
            margin-bottom: 10px;
            padding: 5px 0;
        }
        .floorplan__btn{
            padding: 5px 10px;
            background: #3678AF;
            border-radius: 5px;
            color: #fff;
            border: 0;
            min-width: 100px;
            margin: 10px 0;
            
        }
        .floorplan__link{
            display: block;
            margin-bottom: 10px;
        }
        .floorplan__powered-by{
            max-width: 50%;    
        }
  `]

})

export class FP01Component {

    public fileName: string = 'default-logo.png'; 
    public showPropertyPanel: boolean = false;

  constructor(){}
  floorplan = 
    {
        "id": "floorplan_id",
        "title": "floorplan_title",
        "name": "floorplan_name",
        "header":{
          "logo": "default-logo.png",
          "title": "Title",
          "titleColor": "#000000"
        },
        "body":{
          "buttonLabel": "Activate",
          "buttonBG": "#337ab7",
          "buttonLabelColor":"#ffffff"
        },
        "footer":{}
    }

    locations: any;

    showProperties(){
        this.showPropertyPanel =! this.showPropertyPanel;
    }

    getFiles(fileInput: any){ 
        let file = fileInput.target.files[0];
        this.fileName = file.name;
    } 


    onSubmit(form: NgForm){
        //Form values
        this.floorplan.header.logo = form.value.logo;
        this.floorplan.header.title = form.value.title;
        this.floorplan.header.titleColor = form.value.titleColor;
        this.floorplan.body.buttonLabel = form.value.buttonLabel;
        this.floorplan.body.buttonBG = form.value.buttonBG;
        this.floorplan.body.buttonLabelColor = form.value.buttonLabelColor;
        
        console.log(this.floorplan);
    }

    getFloorplansByID(code) {
        return AppDesignerJSON.data.filter(
            function(data){return data.id == code}
        );
    }
    
}
