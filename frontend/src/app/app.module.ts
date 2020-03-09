import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './shared/pages.module';

// Components
import { AppComponent } from './app.component';
import { TopBlockComponent } from './components/top-block/top-block.component';
import { FooterBlockComponent } from './components/footer-block/footer-block.component';
import { FooterFormComponent } from './components/footer-form/footer-form.component';
import { FirstFormComponent } from './components/first-form/first-form.component';
import { TopFormComponent } from './components/top-form/top-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { CallorderFormComponent } from './components/callorder-form/callorder-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBlockComponent,
    FooterBlockComponent,
    FooterFormComponent,
    FirstFormComponent,
    TopFormComponent,
    QuestionFormComponent,
    CallorderFormComponent,
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule     
  ],
  bootstrap: [AppComponent, ]
})

export class AppModule { }
