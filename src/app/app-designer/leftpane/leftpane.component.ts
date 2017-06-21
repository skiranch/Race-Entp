import { Component} from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { Node } from './node';

declare var jQuery:any;

@Component({
  selector: 'app-leftpane',
  templateUrl: './leftpane.component.html',
  styleUrls: ['./leftpane.component.scss']
})
export class LeftpaneComponent  {

  nodes = [
    {
      id: 1, button: true,
      name: 'Home',
      children: [
        { id: 2, name: 'Create Purchase Requisition', button: false,
          children:[
            { id: 3, name: 'Create - Material item', button: false},
            { id: 4, name: 'Create - Free text item', button: false}
          ]
        },
      ]
    }
  ];

  newNode: Node = new Node();

  onOff(id){
    jQuery(id).toggleClass('enable');
  }
  addNode(newNode) {
    // Just add node and replace nodes variable:
    this.nodes = [this.nodes, newNode];
  }

  
  searchNode(val){
    
  }
}
