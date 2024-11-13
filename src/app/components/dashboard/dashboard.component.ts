import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CalendarioComponent } from '../calendario/calendario.component';
import { CorreoComponent } from '../correo/correo.component';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmpleadoDataService } from '../../shared/empleado-data.service';
import { EmpleadoRespuestaLogin } from '../../interfaces/empleadoRespuestaLogin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ToolbarComponent, CalendarioComponent, CorreoComponent, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent 
{
  private datosCompartidos = inject(EmpleadoDataService);
  private subscripcion: Subscription = new Subscription();
  private router = inject(Router);

  public loginCorrecto: boolean = false;

  ngOnInit()
  {
    const empleadoObserver = 
      {
        next: (empleado: EmpleadoRespuestaLogin) =>
        {
          const empleadoObservado = empleado;

          if(empleadoObservado!.empleadoId != 0)
            {
              this.loginCorrecto=true;
            }
        },
        error: (err: any) =>
        {

        },
        complete: () =>
        {

        }
      }

      this.subscripcion=this.datosCompartidos.empleado$.subscribe(empleadoObserver);
  }

  ngOnDestroy()
  {
    this.subscripcion.unsubscribe();
  }

  goToLogIn()
  {
    this.router.navigate(['/login']); 
  }
 

}
