import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './shared/pages.module';

// Components
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { TopBlockComponent } from './shared/components/top-block/top-block.component';
import { FooterBlockComponent } from './shared/components/footer-block/footer-block.component';
import { FooterFormComponent } from './shared/components/footer-form/footer-form.component';
import { TopFormComponent } from './shared/components/top-form/top-form.component';
import { QuestionFormComponent } from './shared/components/question-form/question-form.component';
import { CallorderFormComponent } from './shared/components/callorder-form/callorder-form.component';

// PWA
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    TopBlockComponent,
    FooterBlockComponent,
    FooterFormComponent,
    TopFormComponent,
    QuestionFormComponent,
    CallorderFormComponent,
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })     
  ],
  bootstrap: [AppComponent, ]
})

export class AppModule { }
