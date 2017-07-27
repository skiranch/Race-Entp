import { Component } from '@angular/core';

@Component({
  selector: 'app-onboard-login',
  template: `
      <img [dragData]="onboardLogin" dnd-draggable [dragEnabled]="true" class="full-width" src="../../../../assets/img/floorplans/onboard-login.png" />
  `
})

export class OnboardLoginComponent {
  
  constructor() { }
  onboardLogin: Array<any> = [{"id": "fp" + new Date().getTime(), "name": "onboardLogin", "properties": [] }];
}
