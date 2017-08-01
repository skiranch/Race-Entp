import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floorplans-img-2',
  template: `
      <div [dragData]="component" dnd-draggable [dragEnabled]="true">
        <img class="full-width" src="./assets/img/floorplans/floorplan-2.png" />
      </div>
  `
})

export class FloorPlansImg2Component {
  constructor(){
  }

  component: Array<any> = [{ "name": "floorPlan2" }];
  
}
