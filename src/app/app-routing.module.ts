import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppGenerationPortalComponent } from './app-generation-portal/app-generation-portal.component';
import { WelcomeComponent } from './app-designer/welcome/welcome.component';

const appRoutes: Routes  = [
    { path: '', component: HomeComponent, data:{ name: 'Home'}},
    { path: 'app-designer', component: WelcomeComponent, data:{ name: 'App Designer Landing'}},
    { path: 'app-generation-portal', component: AppGenerationPortalComponent, data:{ name: 'App Genaration Landing'}},
    //{ path: 'app-designer/applauncher', component: AppsComponent, data:{ name: 'List of apps'}},
    //{ path: 'list', component: DevicepageComponent, data:{ name: 'Apps Designer'}}
    {
        path: 'app-designer/list',
        loadChildren: './app-designer/list/list.module#ListModule'
    },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

export const routingComponents = [
    HomeComponent, WelcomeComponent, AppGenerationPortalComponent];  
