import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioLogin } from '../interfaces/usuario-login';

@Injectable({
  providedIn: 'root'
})
export class UsersService 
{
  private http = inject(HttpClient);
  private base_url: string = "http://localhost:8080/api";

  
  hacerLogin(usuario: UsuarioLogin):Observable<any>
  {
    const endpoint = `${this.base_url}/empleados/login`
    return this.http.post<any>(endpoint, usuario);
  }
}
