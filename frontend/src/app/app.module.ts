import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { FirstBlockComponent } from './components/first-block/first-block.component';
import { VideoBlockComponent } from './components/video-block/video-block.component';
import { TopBlockComponent } from './components/top-block/top-block.component';
import { FourIconsBlockComponent } from './components/four-icons-block/four-icons-block.component';
import { GuidesBlockComponent } from './components/guides-block/guides-block.component';
import { FooterBlockComponent } from './components/footer-block/footer-block.component';
import { SubscribeBlockComponent } from './components/subscribe-block/subscribe-block.component';
import { ScriptHackComponent } from './components/scripthack/scripthack.component';
import { FooterFormComponent } from './components/footer-form/footer-form.component';
import { FirstFormComponent } from './components/first-form/first-form.component';
import { TopFormComponent } from './components/top-form/top-form.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { CallorderFormComponent } from './components/callorder-form/callorder-form.component';
import { Error404Component } from './error404/error404.component';
import { RaftingComponent } from './rafting/rafting.component';
import { MainComponent } from './main/main.component';
import { SemeyniyRaftingComponent } from './semeyniy-rafting/semeyniy-rafting.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstBlockComponent,      
    VideoBlockComponent,
    TopBlockComponent,
    FourIconsBlockComponent,    
    GuidesBlockComponent,
    SubscribeBlockComponent,
    ScriptHackComponent,
    FooterBlockComponent,
    FooterFormComponent,
    FirstFormComponent,
    TopFormComponent,
    QuestionFormComponent,
    CallorderFormComponent,
    Error404Component,
    RaftingComponent,
    MainComponent,
    SemeyniyRaftingComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule     
  ],
  bootstrap: [AppComponent, ]
})

export class AppModule { }
