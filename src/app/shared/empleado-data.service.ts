import { Injectable } from '@angular/core';
import { EmpleadoRespuestaLogin } from '../interfaces/empleadoRespuestaLogin';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoDataService 
{

  private empleadoInicial: EmpleadoRespuestaLogin =
  {
      empleadoId: 0,
      nombre: "",
      rol: "",
      codigoEmpleado:"",
  }

  private empleadoSubject = new BehaviorSubject<EmpleadoRespuestaLogin>(this.empleadoInicial);
  empleado$ = this.empleadoSubject.asObservable();

  setEmpleado(usuario: EmpleadoRespuestaLogin) 
  {
    this.empleadoSubject.next(usuario);
  }
  getEmpleado(): EmpleadoRespuestaLogin | null 
  {
    return this.empleadoSubject.value;
  }
  resetEmpleado()
  {
    this.setEmpleado(this.empleadoInicial);
  }

}
