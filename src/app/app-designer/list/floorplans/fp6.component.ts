import { Component, NgModule, TemplateRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON } from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

@Component({
    templateUrl:`./fp6.component.html`,
    styleUrls: ['./scss/fp.component.scss', './scss/section.scss','./fp6.component.scss'],
   

})
  
export class FP6Component {
    public showPropertyPanel: boolean = false;
    constructor(
        private router: Router,
    ){}

    gotToPreviousScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp5');
    }

    showProperties() {
        this.showPropertyPanel = !this.showPropertyPanel;
    }
}