import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floorplans-img-1',
  template: `
      <div [dragData]="component" dnd-draggable [dragEnabled]="true">
        <img class="full-width" src="./assets/img/floorplans/onboard-login.png" />
      </div>
  `
})

export class FloorPlansImg1Component {
  constructor(){
  }

  component: Array<any> = [{ "name": "floorPlan1" }];
  
}
