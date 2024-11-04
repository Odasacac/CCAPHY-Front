import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CorreoComponent } from './components/correo/correo.component';

export const routes: Routes = 
[
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,
        children :
        [
            { path: 'calendario', component: CalendarioComponent},
            { path: 'correo', component: CorreoComponent},
            { path: '', redirectTo: 'calendario', pathMatch: 'full' },
        ]
     },
    { path: 'restablecer', component: RestablecerComponent},
    
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

