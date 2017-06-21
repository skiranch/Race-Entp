import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

//import { AlertModule } from 'ngx-bootstrap'; //uncomment this line when we need an alert module
//import { DragulaModule } from 'ng2-dragula'; //============ third party module ==============//
import { DndModule } from 'ng2-dnd';
import { AngularSplitModule } from 'angular-split';
import { TreeModule } from 'angular-tree-component';
import { SchemaFormModule, WidgetRegistry, DefaultWidgetRegistry } from "angular2-schema-form";

import { AppComponent } from './app.component';
import { FooterComponent } from './app-designer/footer/footer.component';
import { HeaderComponent } from './app-designer/header/header.component';
import { AppsComponent } from './app-designer/apps/apps.component';
import { DevicepageComponent } from './app-designer/devicepage/devicepage.component';
import { WelcomeComponent } from './app-designer/welcome/welcome.component';
import { LeftpaneComponent } from './app-designer/leftpane/leftpane.component';
import { SanitizeHtmlPipe } from './app-designer/sanitize-html.pipe';
import { firebaseConfig } from './firebaseConfig';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { HomeComponent } from './home/home.component';
import { AppGenerationPortalComponent } from './app-generation-portal/app-generation-portal.component';


const appRoutes: Routes  = [
    { path: '', component: HomeComponent, data:{ name: 'Home'}},
    { path: 'app-designer', component: WelcomeComponent, data:{ name: 'App Designer Landing'}},
    { path: 'app-generation-portal', component: AppGenerationPortalComponent, data:{ name: 'App Genaration Landing'}},
    { path: 'app-designer/applauncher', component: AppsComponent, data:{ name: 'List of apps'}},
    { path: 'app-designer/applauncher/:id', component: DevicepageComponent, data:{ name: 'Apps Designer'}},
    
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AppsComponent,
    DevicepageComponent,
    LeftpaneComponent,
    // TabsComponent,
    SanitizeHtmlPipe,
    SidebarComponent,
    TopmenuComponent,
    HomeComponent,
    WelcomeComponent,
    AppGenerationPortalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    DndModule.forRoot(),
    AngularFireDatabaseModule,
    AngularSplitModule,
    TreeModule,
    SchemaFormModule,
    FormsModule,
    ReactiveFormsModule
    //AlertModule.forRoot() //uncomment this line when we need an alert module
  ],
  providers: [{provide: WidgetRegistry, useClass: DefaultWidgetRegistry}],
  bootstrap: [AppComponent]
})

export class AppModule {

}
