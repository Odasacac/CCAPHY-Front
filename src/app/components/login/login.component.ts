import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { EmpleadoRespuestaLogin } from '../../interfaces/empleadoRespuestaLogin';
import { Router, RouterModule } from '@angular/router';
import { EmpleadoDataService } from '../../shared/empleado-data.service';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoParaLogin } from '../../interfaces/empleadoParaLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  public formularioInicioSesion!: FormGroup;
  private formBuilder = inject(FormBuilder);
  public numeroIntentos: number = 3;

  public nombreVacio: boolean = false;
  public contrasenyaVacia: boolean = false;
  public excesoIntentos: boolean=false;
  public contrasenyaCaducada: boolean=false;
  public usuarioInactivo: boolean = false;

  public inicioSesionIncorrecto: boolean = false;
  private userService = inject(EmpleadosService);

  private userData = inject(EmpleadoDataService)
  private router = inject(Router);


  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  crearFormulario() 
  {
    const camposFormulario =
    {
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      contrasenya : new FormControl('', [Validators.required]),
    }

    this.formularioInicioSesion = new FormGroup(camposFormulario);
  }

  formularioEnviado() 
  {
    this.nombreVacio = false;
    this.contrasenyaVacia = false;
    this.inicioSesionIncorrecto = false;
    this.contrasenyaCaducada=false;

    const datosFormulario = this.formularioInicioSesion.value;
  
    if (datosFormulario.nombre === "") 
    {
      this.nombreVacio = true;
    }
    
    if (datosFormulario.contrasenya === "") 
    {
      this.contrasenyaVacia = true;
    }


    if (!this.nombreVacio && !this.contrasenyaVacia) 
    {
      const usuarioParaLogin: EmpleadoParaLogin = 
      {
        nombre: datosFormulario.nombre,
        contrasenya: datosFormulario.contrasenya
      };

      const loginObserver = 
      {
        next: (respuesta: any) => 
        {
          if (respuesta.empleadoLogueado != null)
          {
              const empleadoLogueado: EmpleadoRespuestaLogin =
              {
                empleadoId: respuesta.empleadoLogueado.empleadoId,
                nombre: respuesta.empleadoLogueado.nombre,
                rol: respuesta.empleadoLogueado.rol,
                codigoEmpleado: respuesta.empleadoLogueado.codigoEmpleado,
              }

              this.userData.setEmpleado(empleadoLogueado);

              sessionStorage.setItem('jwt', respuesta.jwt)

              this.router.navigate(['/dashboard']); 
          }
        },
        error: (err: any) => 
        {
          if (err.error.respuesta == "Contraseña caducada.")
          {
               this.contrasenyaCaducada=true;
          }
          else if (err.error.respuesta == "Usuario no activo.")
          {
            this.usuarioInactivo=true;
          }
          else
          {
            this.inicioSesionIncorrecto = true;
            this.numeroIntentos = this.numeroIntentos -1;

            if (this.numeroIntentos == 0)
              {
   
                this.inicioSesionIncorrecto=false;
              }
    
          }        
        },
        complete: () => 
        {
        }
      }

      this.userService.hacerLogin(usuarioParaLogin).subscribe(loginObserver);
      
    }
  }





}
