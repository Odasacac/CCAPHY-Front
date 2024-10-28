import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../interfaces/usuario-login';
import { RespuestaLogin } from '../interfaces/respuesta-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService 
{
  private http = inject(HttpClient);
  private base_url: string = "http://localhost:8080/api/v1";

  
  hacerLogin(usuario: UsuarioLogin):Observable<RespuestaLogin>
  {
    const endpoint = `${this.base_url}/usuarios/login`
    return this.http.post<RespuestaLogin>(endpoint, usuario);
  }
}
