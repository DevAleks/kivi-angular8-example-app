import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditOrderPageComponent } from './edit-order-page/edit-order-page.component';

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        EditOrderPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
          {
            path: '', component: AdminLayoutComponent, children: [
              {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
              {path: 'login', component: LoginPageComponent},
              {path: 'dashboard', component: DashboardPageComponent},
              {path: 'order/:id/edit', component: EditOrderPageComponent}
            ]
          }
        ])
    ],
    exports: [RouterModule],
    
})
export class AdminModule {

}
