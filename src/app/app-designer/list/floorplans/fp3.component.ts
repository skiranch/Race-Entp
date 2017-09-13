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
    <span class="frame__prev glyphicon glyphicon-triangle-right" (click)="gotToNextScreen()">Next</span>
    <span class="frame__next glyphicon glyphicon-triangle-left" (click)="gotToPreviousScreen()">Prev</span>
    <a href="javascript:void(0)" class="legend" (click)="showProperties()">Properties</a>
        <div class="floorplan">
            <header class="floorplan__header">
                <div class="floorplan__top">
                    <div class="pull-left">
                        <span class="icon-acb_back_new floorplan__icon-acb_back_new"></span>
                    </div>
                    <div class="pull-right">
                        <span class="icon-inr_search_symbol floorplan__icon-inr_search_symbol"></span>
                        <span class="icon-Nav_settings floorplan__icon-Nav_settings"></span>
                    </div>
                </div>
                <div class="floorplan__name">
                    Service Order
                </div>
               <div class="floorplan__header-content">
                    <div class="floorplan__header-logo">

                    </div>
                    <div class="floorplan__header-desc">
                        <span class="floorplan__header-name">
                            Shell Canada Energy
                        </span>
                        <span class="floorplan__header-name">
                            PO No: 4323456765
                        </span>

                        <span class="floorplan__header-details">
                            Document date: March 18, 2017
                        </span>
                        <span class="floorplan__header-details">
                            Outstanding PO Value: 60,000 CAD
                        </span>
                    </div>
               </div>
            </header>

            <nav class="floorplan__nav">
                <ul class="floorplan__nav-container">
                    <li class="floorplan__nav-item floorplan__nav-item--done"><a class="floorplan__nav-link" href="javascript:void(0)">Find order</a><span class="floorplan__nav-step floorplan__nav-step--done icon-done"></span></li>
                    <li class="floorplan__nav-item floorplan__nav-item--active"><a class="floorplan__nav-link" href="javascript:void(0)">Enter Services</a><span class="floorplan__nav-step">2</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="javascript:void(0)">Attach Media</a><span class="floorplan__nav-step">3</span></li>
                    <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="javascript:void(0)">Confirm</a><span class="floorplan__nav-step">4</span></li>
                </ul>
            </nav>
            <div class="floorplan__search-bar">
                <input type="text" class="floorplan__search-input" placeholder="Search/scan" />
                <span class="icon-Scan2 floorplan__icon-Scan2"></span>
            </div>
            <div class="floorplan__body">
                <p class="floorplan__select-services">Select services to add entries</p>
                <ul class="floorplan__list-container">
                    <li class="floorplan__list-item">
                        <div class="floorplan__body-container">
                            <h4 class="floorplan__body-heading">Shell canada energy</h4>
                            <p class="floorplan__body-text-1" >Purchase order: 13214</p>
                            <p class="floorplan__body-text-2" >Document date: Jan 21, 2017</p>
                            <p class="floorplan__body-text-2" >Outstanding PO Value: 180,200 USD</p>
                        </div>
                    </li>
                </ul>
            </div>
            <app-fp-footer></app-fp-footer>
        </div>
    </div>

    <div class="tabs__properties loginFormProperties" [hidden]="showPropertyPanel == false">
        <app-loading *ngIf="loading===true"></app-loading>
       
   </div>

  `,
    styleUrls: ['./scss/fp.component.scss', './scss/section.scss'],
})

export class FP3Component {
    public showPropertyPanel: boolean = false;
    constructor(
        private router: Router,
    ){}

    gotToNextScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp3');
    }

    gotToPreviousScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp2');
    }

    showProperties() {
        this.showPropertyPanel = !this.showPropertyPanel;
    }
}