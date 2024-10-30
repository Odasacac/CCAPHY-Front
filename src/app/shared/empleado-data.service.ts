import { Injectable } from '@angular/core';
import { EmpleadoRespuestaLogin } from '../interfaces/respuesta-login';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoDataService 
{

  private usuarioInicial: EmpleadoRespuestaLogin =
  {
      empleadoId: 0,
      nombre: "",
      rol: ""
  }

  private usuarioSubject = new BehaviorSubject<EmpleadoRespuestaLogin>(this.usuarioInicial);
  usuario$ = this.usuarioSubject.asObservable();

  setUsuario(usuario: EmpleadoRespuestaLogin) 
  {
    this.usuarioSubject.next(usuario);
  }
  getUsuario(): EmpleadoRespuestaLogin | null 
  {
    return this.usuarioSubject.value;
  }
  resetUsuario()
  {
    this.setUsuario(this.usuarioInicial);
  }

}
