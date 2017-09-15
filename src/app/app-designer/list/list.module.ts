import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSplitModule } from 'angular-split';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { HttpModule} from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';

import { ListComponent } from './list.component';
import { ListDetailsComponent } from './list-details.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LeftpaneComponent } from '../leftpane/leftpane.component';
import { RepeatComponent } from './repeatedSection';
import { LoadingComponent } from '../../loading/loading.component';


import { TreeModule } from 'angular-tree-component';
import { DndModule } from 'ng2-dnd';

import { listRouting } from './list.routing';

//Floorplans
import { FPFotterComponent } from './floorplans/fp-footer.component';
import { FPNavComponent } from './floorplans/fp-nav.component';
import { FP0Component } from './floorplans/fp0.component';
import { FP01Component } from './floorplans/fp01.component';
import { FP1Component } from './floorplans/fp1.component';
import { FP2Component } from './floorplans/fp2.component';
import { FP3Component } from './floorplans/fp3.component';
import { FP4Component } from './floorplans/fp4.component';
import { FP5Component } from './floorplans/fp5.component';





@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    listRouting,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule,
    TreeModule,
    AlertModule.forRoot(),
    DndModule.forRoot(),
    FormlyModule.forRoot({
       types: [
        { name: 'repeatSection', component: RepeatComponent }
       ]
     }),
    FormlyBootstrapModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LeftpaneComponent,
    ListComponent,
    ListDetailsComponent,
    FPFotterComponent,
    FPNavComponent,
    FP0Component,
    FP01Component,
    FP1Component, //new floorplans
    FP2Component,
    FP3Component,
    FP4Component,
    FP5Component,
    RepeatComponent,
    LoadingComponent
  ],
  providers: [
  ]
})

export class ListModule {}