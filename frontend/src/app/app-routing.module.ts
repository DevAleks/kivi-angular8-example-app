import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { MainComponent } from './main/main.component';
//import { RaftingComponent } from './rafting/rafting.component';
//import { SemeyniyRaftingComponent } from './semeyniy-rafting/semeyniy-rafting.component';
//import { Error404Component } from './error404/error404.component';

// Таблица роутинга
const appRoutes: Routes = [
  {path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule), pathMatch: 'full'},
//  {path: '', component: MainComponent, pathMatch: 'full'},

  {path: 'rafting', loadChildren: () => import('./rafting/rafting.module').then(m => m.RaftingModule)},
//  {path: 'rafting', component: RaftingComponent},

  {path: 'semeyniy-rafting', loadChildren: () => import('./semeyniy-rafting/semeyniy-rafting.module').then(m => m.SemeyniyRaftingModule)},
//  {path: 'semeyniy-rafting', component: SemeyniyRaftingComponent},

  {path: 'error404', loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module)},
//  {path: 'error404', component: Error404Component},
  {path: '**', redirectTo: '/error404'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
