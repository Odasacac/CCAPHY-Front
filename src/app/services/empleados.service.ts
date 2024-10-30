import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoParaLogin } from '../interfaces/empleado-login';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService 
{
  private http = inject(HttpClient);
  private base_url: string = "http://localhost:8080/api";

  
  hacerLogin(empleado: EmpleadoParaLogin):Observable<any>
  {
    const endpoint = `${this.base_url}/empleados/login`
    return this.http.post<any>(endpoint, empleado);
  }
}
