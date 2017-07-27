import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppGenerationPortalComponent } from './app-generation-portal/app-generation-portal.component';
import { AppsComponent } from './app-designer/apps/apps.component';
import { WelcomeComponent } from './app-designer/welcome/welcome.component';
import { DevicepageComponent } from './app-designer/devicepage/devicepage.component';

const appRoutes: Routes  = [
    { path: '', component: HomeComponent, data:{ name: 'Home'}},
    { path: 'app-designer', component: WelcomeComponent, data:{ name: 'App Designer Landing'}},
    { path: 'app-generation-portal', component: AppGenerationPortalComponent, data:{ name: 'App Genaration Landing'}},
    { path: 'app-designer/applauncher', component: AppsComponent, data:{ name: 'List of apps'}},
    { path: 'app-designer/applauncher/:id', component: DevicepageComponent, data:{ name: 'Apps Designer'}}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }