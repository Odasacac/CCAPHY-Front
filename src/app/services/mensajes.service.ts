import { inject, Injectable } from '@angular/core';
import { EmpleadoParaRestablecer } from '../interfaces/empleado-restablecer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Mensajes } from '../interfaces/mensajes';

@Injectable({
  providedIn: 'root'
})
export class MensajesService 
{
  private http = inject(HttpClient);
  private base_url: string = "http://localhost:8080/api";

  restablecerContrasenya(empleado: EmpleadoParaRestablecer):Observable<any>
  {
    const endpoint = `${this.base_url}/mensajes/cambioContrasenya`
    return this.http.post<any>(endpoint, empleado);
  }
}
