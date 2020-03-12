import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

// Таблица роутинга
const appRoutes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
      {path: 'rafting', loadChildren: () => import('./rafting/rafting.module').then(m => m.RaftingModule)},
      {path: 'semeyniy-rafting', loadChildren: () => import('./semeyniy-rafting/semeyniy-rafting.module').then(m => m.SemeyniyRaftingModule)},  
    ]
  },
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: 'error404', loadChildren: () => import('./error404/error404.module').then(m => m.Error404Module)},
  {path: '**', redirectTo: '/error404'}  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
