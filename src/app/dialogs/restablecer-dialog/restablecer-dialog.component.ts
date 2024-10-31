import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restablecer-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './restablecer-dialog.component.html',
  styleUrl: './restablecer-dialog.component.css'
})
export class RestablecerDialogComponent 
{
  private dialog = inject (MatDialogRef);

  public data = inject(MAT_DIALOG_DATA);

  private codigoEmpleado = this.data.codigoEmpleado;
  private contrasenya = this.data.contrasenya;

  public formularioRestablecerContrasenya!: FormGroup;
  private formBuilder = inject(FormBuilder);

  public codigoVacio: boolean = false;
  public codigoErroneo: boolean = false;

  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  crearFormulario() 
  {
    this.formularioRestablecerContrasenya = this.formBuilder.group(
    {
      codigo: [''],
    });
  }

  formularioEnviado()
  {
    this.codigoVacio=false;


    if (this.formularioRestablecerContrasenya.value.codigo === "")
    {
        this.codigoVacio=true;
    }
    else
    {
      //Comparar el codigo con el requerido

      //Si esta correcto, hacer el cambio de contraseña
      //Si no, this.codigoVacio=true;
    }
  }

  close() 
  {
    this.dialog.close();
  }

}
