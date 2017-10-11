import { Component, NgModule, TemplateRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON } from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

@Component({
    templateUrl: `./fp8.component.html`,
    styleUrls: ['./scss/fp.component.scss', './scss/section.scss','./fp8.component.scss'],
})

export class FP8Component {
    public showPropertyPanel: boolean = false;
    constructor(
        private router: Router,
    ){}

    gotToNextScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp8');
    }

    gotToPreviousScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp7');
    }

    showProperties() {
        this.showPropertyPanel = !this.showPropertyPanel;
    }
}