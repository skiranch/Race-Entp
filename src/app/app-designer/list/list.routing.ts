import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { ListDetailsComponent } from './list-details.component';

//Floorplans
import { FP0Component } from './floorplans/fp0.component';
import { FP01Component } from './floorplans/fp01.component';
import { FP1Component } from './floorplans/fp1.component';
import { FP2Component } from './floorplans/fp2.component';
import { FP3Component } from './floorplans/fp3.component';
import { FP4Component } from './floorplans/fp4.component';
import { FP5Component } from './floorplans/fp5.component';
import { FP6Component } from './floorplans/fp6.component';





const listRoutes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
            path: 'ui',
            component: ListDetailsComponent,
            children: [
                {
                    path: 'fp1',
                    component: FP1Component,
                },
                {
                    path: 'fp2',
                    component: FP2Component,
                },
                {
                    path: 'fp3',
                    component: FP3Component,
                },
                {
                    path: 'fp4',
                    component: FP4Component,
                },
                {
                    path: 'fp5',
                    component: FP5Component,
                },
                {
                    path: 'fp6',
                    component: FP6Component,
                },
                {
                    path: 'fp0',
                    component: FP0Component,
                },
                {
                    path: 'fp01',
                    component: FP01Component,
                },
            ]
        } 
    ]
  

export const listRouting: ModuleWithProviders = RouterModule.forChild(listRoutes);