import { NgModule } from "@angular/core"
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { VideoBlockComponent } from './components/video-block/video-block.component'
import { ScriptHackComponent } from './components/scripthack/scripthack.component'
import { FourIconsBlockComponent } from './components/four-icons-block/four-icons-block.component'
import { GuidesBlockComponent } from './components/guides-block/guides-block.component'
import { SubscribeBlockComponent } from './components/subscribe-block/subscribe-block.component'
import { FirstFormComponent } from './components/first-form/first-form.component'

@NgModule({
    declarations: [
        VideoBlockComponent,
        ScriptHackComponent,
        FourIconsBlockComponent,    
        GuidesBlockComponent,
        SubscribeBlockComponent,
        FirstFormComponent
    ],
    exports: [
        VideoBlockComponent,
        ScriptHackComponent,
        FourIconsBlockComponent,    
        GuidesBlockComponent,
        SubscribeBlockComponent,
        FirstFormComponent
    ],    
    imports: [
        CommonModule,
        SharedModule,   
    ],
})
export class PagesModule {

}
