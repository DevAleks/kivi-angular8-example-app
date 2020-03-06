import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RaftingComponent } from './components/rafting/rafting.component';
import { SemeyniyRaftingComponent } from './components/semeyniy-rafting/semeyniy-rafting.component';
import { Error404Component } from './components/error404/error404.component';

// Таблица роутинга
const appRoutes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'rafting', component: RaftingComponent},
  {path: 'semeyniy-rafting', component: SemeyniyRaftingComponent},
  {path: 'error404', component: Error404Component},
  {path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
