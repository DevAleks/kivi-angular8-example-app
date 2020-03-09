import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../shared/pages.module';

import { RaftingComponent } from './rafting.component';

@NgModule ({
    declarations: [
        RaftingComponent, 
    ],
    imports: [
        CommonModule,
        SharedModule,
        PagesModule,
        RouterModule.forChild ([
            { path: '', component: RaftingComponent },
        ])
    ],
    exports: [
        RouterModule,
        PagesModule
    ]
})
export class RaftingModule {

}
