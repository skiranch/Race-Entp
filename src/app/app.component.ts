import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper active" [ngClass]="location.indexOf('list') === -1 ? '' : 'applauncher'">
          <app-sidebar></app-sidebar>
          <div id="page-content-wrapper">
            <app-topmenu></app-topmenu>
            <router-outlet></router-outlet>
          </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  public location = '' ;

  constructor(location: Location) { 
      this.location = location.path();

      console.log(this.location)

  }
 
}
