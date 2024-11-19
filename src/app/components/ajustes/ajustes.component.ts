import { Component, inject } from '@angular/core';
import { EmpleadoDataService } from '../../shared/empleado-data.service';
import { Subscription } from 'rxjs';
import { EmpleadoRespuestaLogin } from '../../interfaces/empleadoRespuestaLogin';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CambioContrasenyaComponent } from '../../dialogs/cambio-contrasenya/cambio-contrasenya.component';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent 
{
  private datosEmpleado = inject(EmpleadoDataService);
  private subscripcion: Subscription = new Subscription();
  public esResponsable =false;
  public esAdmin =false;
  private dialog = inject (MatDialog)
  private codigoDelEmpleado:String = "";

  ngOnInit()
  {
    const empleadoObserver = 
      {
        next: (empleado: EmpleadoRespuestaLogin) =>
        {
          if (empleado.rol == 'RESPONSABLE')
          {
            this.esResponsable=true;
          }
          else if (empleado.rol == "ADMIN")
          {
            this.esAdmin=true;
          }

          this.codigoDelEmpleado=empleado.codigoEmpleado;
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



  cambiarContrasenya()
  {
    this.dialog.open(CambioContrasenyaComponent, {data: {codigoEmpleado: this.codigoDelEmpleado}});
  }

  cambiarResponsableDePaciente()
  {

  }

  crearEmpleado()
  {

  }

  restablecerContrasenya()
  {

  }

  modificarRolEmpleado()
  {

  }

  modificarEstadoEmpleado()
  {

  }

  cambiarResponsableDeEmpleado()
  {

  }


}
