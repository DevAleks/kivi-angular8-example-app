import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditOrderPageComponent } from './edit-order-page/edit-order-page.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';

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
              {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
              {path: 'order/:id/edit', component: EditOrderPageComponent, canActivate: [AuthGuard]}
            ]
          }
        ])
    ],
    exports: [RouterModule],
    providers: [AuthService, AuthGuard]
    
})
export class AdminModule {

}
