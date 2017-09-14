import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { FormlyModule, FormlyBootstrapModule } from 'ng-formly';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { SanitizeHtmlPipe } from './app-designer/sanitize-html.pipe';
import { firebaseConfig } from './firebaseConfig';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { HomeComponent } from './home/home.component';
import { OrderByPipe } from './app-generation-portal/orderby.pipe';


@NgModule({
  declarations: [
    AppComponent, routingComponents,
    SanitizeHtmlPipe,
    SidebarComponent,
    TopmenuComponent,
    HomeComponent,
    OrderByPipe
  ],

  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

}
