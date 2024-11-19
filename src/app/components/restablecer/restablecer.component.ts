import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleadoParaRestablecer } from '../../interfaces/empleadoParaRestablecer';
import { MatDialog} from '@angular/material/dialog';  
import { MensajesService } from '../../services/mensajes.service';
import { DialogGeneralComponent } from '../../dialogs/dialog-general/dialog-general.component';

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

    const datosFormulario = this.formularioRestablecerContrasenya.value;

    if (datosFormulario.codigo === "") 
    {
      this.codigoVacio = true;
    }
    if (datosFormulario.contrasenya === "" || datosFormulario.contrasenyaR === "") 
    {
      this.contrasenyaVacia = true;
    }

    if (datosFormulario.contrasenya != datosFormulario.contrasenyaR)
    {
      this.contrasenyasNoCoinciden = true;
    }

    if (!this.codigoVacio && !this.contrasenyaVacia && !this.contrasenyasNoCoinciden) 
    {
      const datosParaMensaje: EmpleadoParaRestablecer = 
      {
        codigoEmpleado: datosFormulario.codigo,
        contrasenya: datosFormulario.contrasenya,
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

      this.mensajeService.restablecerContrasenya(datosParaMensaje).subscribe(restablecerObserver);

      this.dialog.open(DialogGeneralComponent, {data: {volverALogin:true, header: "Petición solicitada", body: "Se procesará lo antes posible."}});
    }



  }
}
