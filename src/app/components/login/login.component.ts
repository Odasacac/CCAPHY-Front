import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioLogin } from '../../interfaces/usuario-login';
import { UsersService } from '../../services/users.service';
import { UsuarioRespuestaLogin } from '../../interfaces/respuesta-login';
import { UserDataService } from '../../shared/user-data.service';
import { Router } from '@angular/router';

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
  private userService = inject(UsersService);

  private userData = inject(UserDataService)
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
        const usuarioParaLogin: UsuarioLogin =
        {
          nombre: this.formularioInicioSesion.value.nombre,
          contrasenya: this.formularioInicioSesion.value.contrasenya
        };

       console.log(usuarioParaLogin)
        this.userService.hacerLogin(usuarioParaLogin).subscribe(inicioSesion=>
        {
          console.log(inicioSesion)
          if (inicioSesion.empleadoLogueado)
          {
            //Ir a dashboard
            this.router.navigate(['/dashboard']);
            //Actualizar los datos del usuario en el user-data
            
            this.userData.setUsuario(inicioSesion.values);
          }
          else
          {
            this.inicioSesionIncorrecto=true;
          }
        });
      

    }
  }






}
