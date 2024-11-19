import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoParaLogin } from '../interfaces/empleadoParaLogin';
import { EmpleadoParaRestablecer } from '../interfaces/empleadoParaRestablecer';

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

  cambiarContrasenya(empleado: EmpleadoParaRestablecer):Observable<any>
  {
    const endpoint = `${this.base_url}/empleados/restableceremp`
    return this.http.put<any>(endpoint, empleado);
  }

}
