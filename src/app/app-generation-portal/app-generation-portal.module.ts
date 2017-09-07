import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSplitModule } from 'angular-split';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule,
    FormlyBootstrapModule,
    HttpClientModule
  ],
  declarations: [

  ],
  providers: [
  ]
})

export class AppGenerationPortalModule {}