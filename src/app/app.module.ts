import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { DynamicComponentModule } from 'ng-dynamic';

//import { AlertModule } from 'ngx-bootstrap'; //uncomment this line when we need an alert module
//import { DragulaModule } from 'ng2-dragula'; //============ third party module ==============//
import { DndModule } from 'ng2-dnd';
import { AngularSplitModule } from 'angular-split';
import { TreeModule } from 'angular-tree-component';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './app-designer/footer/footer.component';
import { HeaderComponent } from './app-designer/header/header.component';
import { AppsComponent } from './app-designer/apps/apps.component';
import { DevicepageComponent } from './app-designer/devicepage/devicepage.component';
import { WelcomeComponent } from './app-designer/welcome/welcome.component';
import { LeftpaneComponent } from './app-designer/leftpane/leftpane.component';
import { SanitizeHtmlPipe } from './app-designer/sanitize-html.pipe';
import { OnboardLoginComponent } from './app-designer/floorplans/onboard-login.component';

import { firebaseConfig } from './firebaseConfig';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { HomeComponent } from './home/home.component';
import { AppGenerationPortalComponent } from './app-generation-portal/app-generation-portal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AppsComponent,
    DevicepageComponent,
    LeftpaneComponent,
    SanitizeHtmlPipe,
    SidebarComponent,
    TopmenuComponent,
    HomeComponent,
    WelcomeComponent,
    AppGenerationPortalComponent,
    OnboardLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    DndModule.forRoot(),
    AngularFireDatabaseModule,
    AngularSplitModule,
    TreeModule,
    SchemaFormModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicComponentModule.forRoot({})
    //AlertModule.forRoot() //uncomment this line when we need an alert module
  ],
  providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}, Title],
  bootstrap: [AppComponent]
})

export class AppModule {

}
