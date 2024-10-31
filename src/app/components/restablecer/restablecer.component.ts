import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmpleadoParaRestablecer } from '../../interfaces/empleado-restablecer';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RestablecerDialogComponent } from '../../dialogs/restablecer-dialog/restablecer-dialog.component';

@Component({
  selector: 'app-restablecer',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './restablecer.component.html',
  styleUrl: './restablecer.component.css'
})
export class RestablecerComponent 
{
  public formularioRestablecerContrasenya!: FormGroup;
  private formBuilder = inject(FormBuilder);

  public codigoVacio: boolean = false;
  public contrasenyaVacia: boolean = false;

  private dialog = inject (MatDialog);

  
  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  crearFormulario() 
  {
    this.formularioRestablecerContrasenya = this.formBuilder.group(
    {
      codigo: [''],
      contrasenya: ['']
    });
  }

  formularioEnviado()
  {
    this.codigoVacio = false;
    this.contrasenyaVacia = false;

    if (this.formularioRestablecerContrasenya.value.codigo === "") {
      this.codigoVacio = true;
    }
    if (this.formularioRestablecerContrasenya.value.contrasenya === "") {
      this.contrasenyaVacia = true;
    }

    if (!this.codigoVacio && !this.contrasenyaVacia) 
    {
      const usuarioParaRestablecer: EmpleadoParaRestablecer = 
      {
        codigoEmpleado: this.formularioRestablecerContrasenya.value.codigo,
        contrasenya: this.formularioRestablecerContrasenya.value.contrasenya
      };

      this.dialog.open(RestablecerDialogComponent, { data: usuarioParaRestablecer });
    }
  }
}
