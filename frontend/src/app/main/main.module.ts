import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../shared/pages.module';

import { MainComponent } from './main.component';
import { FirstBlockComponent } from '../components/first-block/first-block.component';

@NgModule ({
    declarations: [
        MainComponent, 
        FirstBlockComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PagesModule,
        RouterModule.forChild ([
            { path: '', component: MainComponent },
        ])
    ],
    exports: [
        RouterModule,
        PagesModule
    ]
})
export class MainModule {

}
