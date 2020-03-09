import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Sevices
import { GetJsonService } from './services/get-json.service';
import { FormsService } from './services/forms.service';

// Pipes
import { SafePipe } from './pipes/safePipe';

@NgModule({
    declarations: [
        SafePipe,
    ],
    imports: [
        HttpClientModule, 
        FormsModule,
        ReactiveFormsModule,
        LazyLoadImageModule  
    ],
    exports: [
        HttpClientModule, 
        FormsModule,
        ReactiveFormsModule,
        SafePipe,
        LazyLoadImageModule
    ],
    providers: [GetJsonService, FormsService]
})
export class SharedModule {

}
