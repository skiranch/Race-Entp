import { Component, NgModule, TemplateRef } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON } from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

//Json data
import * as data from './fp2.json'
const floorplanData = (<any>data);
console.log(floorplanData);

declare var jQuery: any;

@Component({
    template: `
  <div class="frame">
    <!--<span class="frame__prev glyphicon glyphicon-triangle-right" (click)="gotToNextScreen()">Next</span>-->
    <span class="frame__next glyphicon glyphicon-triangle-left" (click)="gotToPreviousScreen()">Prev</span>
    <a href="javascript:void(0)" class="legend" (click)="showProperties()">Properties</a>
        <div class="floorplan">
            <header class="floorplan__header">
                <div class="floorplan__top">
                    <div class="pull-left">
                        <span class="floorplan__icon-text">Done</span>
                    </div>
                    <div class="pull-right">
                        <span class="floorplan__icon-text">Filter</span>
                    </div>
                </div>
                <div class="floorplan__name">
                   Enter Services
                </div>
            </header>
            <div class="floorplan__search-bar floorplan__margintop-0">
                <input type="text" class="floorplan__search-input" placeholder="Search/scan" />
                <span class="icon-Scan2 floorplan__icon-Scan2"></span>
            </div>
            <div class="floorplan__body">
                <p class="floorplan__select-services">Enter from planned service items</p>

                <div class="floorplan__body">
                    <ul class="floorplan__list-container">
                        <li class="floorplan__list-item">
                            <div class="floorplan__body-container">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="pull-left">
                                            <input type="radio" checked  />
                                        </div>
                                        <div class="col-md-11">
                                            <span class="floorplan__item-name">Item 1 Trench <br/>Excavation</span>
                                            <span class="floorplan__item-text">Allocated Qty: 99 HRS</span>
                                            <span class="floorplan__item-text">Outstanding Qty: 99 HRS</span>
                                            <span class="floorplan__item-text">Unit Price: 200 CAD</span>
                                            <div class="floorplan__list-form-container">
                                                <div class="form-group clearfix">
                                                    <label class="floorplan__list-form-label col-md-5 app-designer__no-padding">Qauntity</label>
                                                    <input placeholder="Enter" type="text" value="10" class="floorplan__list-form-elm col-md-5 app-designer__no-padding" />
                                                    <span class="floorplan__list-form-label col-md-2 app-designer__no-padding text-right">HRS</span>
                                                </div>

                                                <div class="form-group clearfix">
                                                    <label class="floorplan__list-form-label col-md-5 app-designer__no-padding">Value</label>
                                                    <span class="floorplan__list-form-label col-md-4 app-designer__no-padding pull-right text-right">0 CAD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <app-fp-footer activeSearch="" activeOrders="fp2__footer-link--active"></app-fp-footer>
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
        <app-loading *ngIf="loading===true"></app-loading>
        <p>No properties mapped for this floorplan.</p>
   </div>

  `,
    styleUrls: ['./scss/fp.component.scss', './scss/section.scss'],
})

export class FP5Component {
    public showPropertyPanel: boolean = false;
    constructor(
        private router: Router,
    ){}

    gotToPreviousScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp4');
    }

    showProperties() {
        this.showPropertyPanel = !this.showPropertyPanel;
    }
}