import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Error404Component } from './error404.component';

@NgModule ({
    declarations: [
        Error404Component,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild ([
            { path: '', component: Error404Component },
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class Error404Module {

}
