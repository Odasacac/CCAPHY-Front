import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RestablecerComponent } from './components/restablecer/restablecer.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CorreoComponent } from './components/correo/correo.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';

export const routes: Routes = 
[
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent,
        children :
        [
            { path: 'calendario', component: CalendarioComponent},
            { path: 'correo', component: CorreoComponent},
            { path: 'pacientes', component: PacientesComponent},
            { path: 'ajustes', component: AjustesComponent},
            { path: '', redirectTo: 'calendario', pathMatch: 'full' },
        ]
     },
    { path: 'restablecer', component: RestablecerComponent},
    
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

