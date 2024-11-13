import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmpleadoRespuestaLogin } from '../../interfaces/respuesta-login';
import { Subscription } from 'rxjs';
import { EmpleadoDataService } from '../../shared/empleado-data.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent 
{
  private datosEmpleado = inject(EmpleadoDataService);
  private subscripcion: Subscription = new Subscription();
  private router = inject(Router);

  public nombre: string = "";


  ngOnInit()
  {
    const empleadoObserver = 
      {
        next: (empleado: EmpleadoRespuestaLogin) =>
        {
          this.nombre = empleado.nombre;
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

  logout ()
  {
    this.datosEmpleado.resetEmpleado();
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']); 
  }

}
