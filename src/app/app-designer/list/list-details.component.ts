import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


import { AppDesignerJSON }  from '../globals';
import { LeftpaneComponent } from '../leftpane/leftpane.component';
import { ShowHideSharedService } from '../show-hide-shared.service';
import { SortableContainer } from 'ng2-dnd';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-list-details',
  template: `
    <title>Race Enterprise: App Designer</title>
    <app-designer-header></app-designer-header>
    <split direction="horizontal">
      <split-area [size]="20">
        <div class="leftpane">
          <app-leftpane></app-leftpane>
        </div>
      </split-area>
      <split-area [size]="50">

      <div class="device-area">
      <div class="device-area__full-screen-container" [class.active]="isFullScreenActive">

        <!--top bar-->
        <div class="device-area__topbar">
          <div class="row">
            <div class="col-md-5">
              <select #device class="form-control" (change)="changeDevice(device.value)">
                    <option value="iphone">Iphone</option>
                    <option value="android">Android</option>
                    <option value="ipad">Ipad</option>
                    <option value="android-tab">Android Tab</option>
                  </select>
            </div>
            <span class="device-area__rotate-icon" (click)="rotateScreen(device.value)" [hidden]="!sh.showhide.show"></span>
            <div class="col-md-4 pull-right text-right" [hidden]="sh.showhide.show">
              <button class="btn btn-success btn-download"  (click)="downloadJSON()">Save</button>
              <button class="btn btn-default">Preview</button>
            </div>
          </div>
        </div>
        <!--top bar-->

         <span [class.glyphicon-resize-small]="sh.showhide.show" href="#" class="device-area__full-screen-button glyphicon glyphicon-resize-full"
          (click)=fullScreen()></span>
          
          <div class="device-area__all device-area__{{device.value}} device-area__{{device.value}}--{{rotate}}" [dropZones]="['zone1']" dnd-droppable (onDropSuccess)="transferDataSuccess($event)">
            <div class="device-area__dragged-items">
                <router-outlet></router-outlet>
            </div>
          </div>

        </div>
        </div>
      </split-area>
      <split-area [size]="30">
      <div class="tabs">
        <ul class="tabs__container">
          <li class="tabs__item">
            <a class="tabs__item-link" href="#tab1default" data-toggle="tab">All</a>
          </li>
          <li class="tabs__item active"><a class="tabs__item-link active" href="#tab2default" data-toggle="tab">Floorplans</a>
          </li>
          <li class="tabs__item"><a class="tabs__item-link" href="#tab3default" data-toggle="tab">Frameworks</a>
          </li>
          <li class="tabs__item"><a class="tabs__item-link" href="#tab4default" data-toggle="tab">Views</a>
          </li>
          <li class="tabs__item"><a class="tabs__item-link" href="#tab5default" data-toggle="tab">Field Types</a>
          </li>
          <li class="tabs__item"><a class="tabs__item-link" href="#tab6default" data-toggle="tab">Controls</a></li>
        </ul>
         <div class="tabs__body tab-content">
          <div class="tab-pane fade" id="tab1default">All Content here</div>
          <div class="tab-pane fade in active" id="tab2default">
            
          <ul class="tabs__content-items">
              <li class="tabs__content-item">
                <a href="#/app-designer/list/ui/fp1" [dropZones]="['zone1']"  [dragData]="flooplanData"  dnd-draggable [dragEnabled]="true">
                  <img class="full-width" src="./assets/img/floorplans/floorplan-1.png" />
                </a>
              </li>
              <li class="tabs__content-item">
                <a href="#/app-designer/list/ui/fp2" [dragData]="" dnd-draggable [dragEnabled]="true">
                  <img class="full-width" src="./assets/img/floorplans/floorplan-2.png" />
                </a>
              </li>
              <!--<li class="tabs__content-item">
                <a href="#/app-designer/list/ui/fp01" [dropZones]="['zone1']"  [dragData]="flooplanData"  dnd-draggable [dragEnabled]="true">
                  <img class="full-width" src="./assets/img/floorplans/onboard-login.png" />
                </a>
              </li>-->
              
            </ul>

          </div>
          <div class="tab-pane fade" id="tab3default">Frameworks</div>
          <div class="tab-pane fade" id="tab4default">Field Types</div>
          <div class="tab-pane fade" id="tab5default">Controls</div>
        </div>
      </div>
      </split-area>
    </split>
    <app-designer-footer></app-designer-footer>
  `,
    styleUrls: ['./list-details.component.scss'],
    providers:[ShowHideSharedService, SortableContainer]
})
export class ListDetailsComponent {
  
  private location = '' ;
  private router = '' ;

  constructor(
    public sh: ShowHideSharedService,
    location: Location,
    router: Router
  ){
    this.location = location.path();
  }

    public isFullScreenActive: boolean = false;
    public rotate: boolean = false;
    public filling: boolean = false;
    receivedData: Array<any> = [];

    flooplanData: Object = { "name": "fp2" };
    downloadJSON(){
      console.log('downloading...')
    }
    transferDataSuccess($event: any) {
        this.receivedData.push($event);
        
        console.log(this.receivedData)

        if($event.dragData.name == "fp2"){
            console.log('arun');

            console.log(this.location);

            
        }
       
    }

    fullScreen(){
        this.isFullScreenActive = !this.isFullScreenActive;
        this.sh.hide();
    }

    rotateScreen(val){
        this.rotate=!this.rotate
    }

    changeDevice(val){
        console.log(val);
    }

}