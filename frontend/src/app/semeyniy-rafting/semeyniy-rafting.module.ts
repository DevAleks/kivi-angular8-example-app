import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from '../shared/pages.module';

import { SemeyniyRaftingComponent } from './semeyniy-rafting.component';

@NgModule ({
    declarations: [
        SemeyniyRaftingComponent, 
    ],
    imports: [
        CommonModule,
        SharedModule,
        PagesModule,
        RouterModule.forChild ([
            { path: '', component: SemeyniyRaftingComponent },
        ])
    ],
    exports: [
        RouterModule,
        PagesModule
    ]
})
export class SemeyniyRaftingModule {

}
