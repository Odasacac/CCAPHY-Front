import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';

export const routes: Routes = 
[
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'restablecer', component: RestablecerComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

