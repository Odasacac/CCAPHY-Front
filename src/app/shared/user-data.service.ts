import { Injectable } from '@angular/core';
import { UsuarioRespuestaLogin } from '../interfaces/respuesta-login';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService 
{

  private usuarioInicial: UsuarioRespuestaLogin =
  {
      nombre: "",
      codigo: "",
      rol: 0
  }

  private usuarioSubject = new BehaviorSubject<UsuarioRespuestaLogin>(this.usuarioInicial);
  usuario$ = this.usuarioSubject.asObservable();

  setUsuario(usuario: UsuarioRespuestaLogin) 
  {
    this.usuarioSubject.next(usuario);
  }
  getUsuario(): UsuarioRespuestaLogin | null 
  {
    return this.usuarioSubject.value;
  }
  resetUsuario()
  {
    this.setUsuario(this.usuarioInicial);
  }

}
