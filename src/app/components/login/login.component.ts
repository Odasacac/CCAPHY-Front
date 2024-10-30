import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EmpleadoRespuestaLogin } from '../../interfaces/respuesta-login';
import { Router } from '@angular/router';
import { EmpleadoDataService } from '../../shared/empleado-data.service';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoParaLogin } from '../../interfaces/empleado-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{
  public formularioInicioSesion!: FormGroup;
  private formBuilder = inject(FormBuilder);

  public nombreVacio: boolean = false;
  public contrasenyaVacia: boolean = false;

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
    this.formularioInicioSesion = this.formBuilder.group(
    {
      nombre: [''],
      contrasenya: ['']
    });
  }

  formularioEnviado()
  {
    this.nombreVacio=false;
    this.contrasenyaVacia=false;
    this.inicioSesionIncorrecto=false;

    if (this.formularioInicioSesion.value.nombre === "")
    {
        this.nombreVacio=true;
    }
    else if (this.formularioInicioSesion.value.contrasenya === "")
    {
      this.contrasenyaVacia=true;
    }
    else
    {
        const usuarioParaLogin: EmpleadoParaLogin =
        {
          nombre: this.formularioInicioSesion.value.nombre,
          contrasenya: this.formularioInicioSesion.value.contrasenya
        };

        const loginObserver = 
        {
          next: (respuesta:any) => 
          {  
            console.log(respuesta)
            /*
            if (!inicioSesion.empleadoLogueado)
            {
              this.inicioSesionIncorrecto=true;
            }
            else
            {
              //Actualizar los datos del usuario en el user-data
              this.userData.setUsuario(inicioSesion.values);
  
              //Almacenar el JWT
           
  
              //Ir a dashboard
              this.router.navigate(['/dashboard']);
            }
              */
          },
          error: (err: any) => 
          {
            console.log(err)
          },
          complete: () => 
          {
            console.log('La petición para obtener el JWT ha finalizado.');
          }
        };
    
    

       console.log(usuarioParaLogin)
        this.userService.hacerLogin(usuarioParaLogin).subscribe(loginObserver);
      

    }
  }






}
