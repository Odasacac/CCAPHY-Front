import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmpleadoRespuestaLogin } from '../../interfaces/empleadoRespuestaLogin';
import { Subscription } from 'rxjs';
import { EmpleadoDataService } from '../../shared/empleado-data.service';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../others/material/material.module';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent 
{
  private datosEmpleado = inject(EmpleadoDataService);
  private subscripcion: Subscription = new Subscription();
  private router = inject(Router);
  public esResponsable =false;
  public esAdmin =false;

  public nombre: string = "";


  ngOnInit()
  {
    const empleadoObserver = 
      {
        next: (empleado: EmpleadoRespuestaLogin) =>
        {
          this.nombre = empleado.nombre;


          if (empleado.rol == 'RESPONSABLE')
          {
            this.esResponsable=true;
          }
          else if (empleado.rol == "ADMIN")
          {
            this.esAdmin=true;
          }
        },
        error: (err: any) =>
        {
          
        },
        complete: () =>
        {

        }
      }

      this.subscripcion=this.datosEmpleado.empleado$.subscribe(empleadoObserver);
  }

  ngOnDestroy()
  {
    if (this.subscripcion) 
    {
      this.subscripcion.unsubscribe();
    }
  }

  logout()
  {
    this.datosEmpleado.resetEmpleado();
    sessionStorage.removeItem('jwtToken');
    this.router.navigate(['/login']); 
  }

  calendario()
  {
    this.router.navigate(['/dashboard/calendario']); 
  }

  correo()
  {
    this.router.navigate(['/dashboard/correo']); 
  }

  pacientes()
  {
    this.router.navigate(['/dashboard/pacientes']); 
  }

  empleados()
  {
    this.router.navigate(['/dashboard/empleados']); 
  }

  ajustes()
  {
    this.router.navigate(['/dashboard/ajustes']); 
  }


}
