import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cambio-responsabilidades',
  standalone: true,
  imports: [],
  templateUrl: './cambio-responsabilidades.component.html',
  styleUrl: './cambio-responsabilidades.component.css'
})
export class CambioResponsabilidadesComponent 
{
  private data = inject (MAT_DIALOG_DATA);

  public cambioEmpleado:boolean = this.data.empleado;
  public cambioPaciente: boolean = this.data.paciente;
  public choice:String="";

  ngOnInit()
  {
    if (this.cambioEmpleado)
    {
      this.choice = "empleado";

      //Obtener todos los empleados
      //Hacer un primer array con los que son empleados
      //Hacer un segundo array con todos los responsables

    }
    if (this.cambioPaciente)
    {
      this.choice = "paciente";

      //Obtener todos los empleados de los cuales este usuario es responsable
      //Hacer un primer array con esos empleados
      //Hacer un segundo array con los pacientes de esos empleados

    }


  }

}
