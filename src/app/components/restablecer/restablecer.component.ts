import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleadoParaRestablecer } from '../../interfaces/empleado-restablecer';
import { MatDialog} from '@angular/material/dialog';  
import { MensajesService } from '../../services/mensajes.service';
import { PeticionRealizadaComponent } from '../../dialogs/peticion-realizada/peticion-realizada.component';

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './restablecer.component.html',
  styleUrl: './restablecer.component.css'
})
export class RestablecerComponent 
{
  public formularioRestablecerContrasenya!: FormGroup;
  private formBuilder = inject(FormBuilder);

  public codigoVacio: boolean = false;
  public contrasenyaVacia: boolean = false;
  public contrasenyasNoCoinciden: boolean = false;

  private dialog = inject (MatDialog)
  private mensajeService = inject(MensajesService);

  
  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  crearFormulario() 
  {
    this.formularioRestablecerContrasenya = this.formBuilder.group(
    {
      codigo: [''],
      contrasenya: [''],
      contrasenyaR: ['']
    });
  }

  formularioEnviado()
  {
    this.codigoVacio = false;
    this.contrasenyaVacia = false;
    this.contrasenyasNoCoinciden = false;

    if (this.formularioRestablecerContrasenya.value.codigo === "") 
    {
      this.codigoVacio = true;
    }
    if (this.formularioRestablecerContrasenya.value.contrasenya === "" || this.formularioRestablecerContrasenya.value.contrasenyaR === "") 
    {
      this.contrasenyaVacia = true;
    }

    if (this.formularioRestablecerContrasenya.value.contrasenya != this.formularioRestablecerContrasenya.value.contrasenyaR)
    {
      this.contrasenyasNoCoinciden = true;
    }

    if (!this.codigoVacio && !this.contrasenyaVacia && !this.contrasenyasNoCoinciden) 
    {
      const mensajeParaAdmin: EmpleadoParaRestablecer = 
      {
        codigoEmpleado: this.formularioRestablecerContrasenya.value.codigo,
        contrasenya: this.formularioRestablecerContrasenya.value.contrasenya,
      };

      const restablecerObserver = 
      {
        next: (respuesta: any) => 
        {

        },
        error: (err: any) => 
        {

        },
        complete: () => 
        {
          this.formularioRestablecerContrasenya.reset();
        }
      }

      this.mensajeService.restablecerContrasenya(mensajeParaAdmin).subscribe(restablecerObserver);

      this.dialog.open(PeticionRealizadaComponent);
    }



  }
}
