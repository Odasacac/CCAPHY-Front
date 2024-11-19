import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmpleadoParaRestablecer } from '../../interfaces/empleadoParaRestablecer';
import { EmpleadosService } from '../../services/empleados.service';
import { DialogGeneralComponent } from '../dialog-general/dialog-general.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambio-contrasenya',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './cambio-contrasenya.component.html',
  styleUrl: './cambio-contrasenya.component.css'
})
export class CambioContrasenyaComponent 
{
  private dialogRef = inject(MatDialogRef);
  private router = inject(Router);
  private data = inject (MAT_DIALOG_DATA);
  private dialog = inject (MatDialog)
  public formularioCambiarContrasenya!: FormGroup;
  private formBuilder = inject(FormBuilder);
  public contrasenyaVacia:boolean=false;
  public contrasenyasNoCoinciden:boolean=false;
  private userService = inject(EmpleadosService);

  private codigoEmpleado = this.data.codigoEmpleado

  ngOnInit(): void 
  {
    this.crearFormulario();
  }

  crearFormulario() 
  {    this.formularioCambiarContrasenya = this.formBuilder.group(
    {
      contrasenya: [''],
      contrasenyaR: ['']
    });
  }

  closeAjus():void
  {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/ajustes']); 
  }

  formularioEnviado()
  {
    this.contrasenyaVacia = false;
    this.contrasenyasNoCoinciden = false;

    const datosFormulario = this.formularioCambiarContrasenya.value;

    if (datosFormulario.contrasenya === "" || datosFormulario.contrasenyaR === "") 
      {
        this.contrasenyaVacia = true;
      }
  
      if (datosFormulario.contrasenya != datosFormulario.contrasenyaR)
      {
        this.contrasenyasNoCoinciden = true;
      }

      if (!this.contrasenyaVacia && !this.contrasenyasNoCoinciden) 
      {
        const empleadoCambioContrasenya: EmpleadoParaRestablecer = 
        {
          codigoEmpleado: this.codigoEmpleado,
          contrasenya: datosFormulario.contrasenya,
        };
        const restablecerObserver = 
        {
          next: (respuesta: any) => 
          {
            this.dialog.open(DialogGeneralComponent, {data: {volverAAjustes:true, header: "Operación realizada con éxito", body: "Los cambios ya se han efectuado."}});
            this.closeAjus()
          },
          error: (err: any) => 
          {
            console.log(err)
            if (err.error.respuesta == "Contraseña anterior.")
            {
              this.dialog.open(DialogGeneralComponent, {data: {volverAAjustes:true, header: "Error al procesar la operación", body: "La contraseña introducida es la actual."}});
              this.closeAjus();
            }
            else
            {
              this.dialog.open(DialogGeneralComponent, {data: {volverAAjustes:true, header: "Error al procesar la operación", body: "Ha ocurrido un error, contacte con ADMIN@CCAPHY.COM."}});
              this.closeAjus();
            }
           
        
          },
          complete: () => 
          {
            this.formularioCambiarContrasenya.reset();
          }
        }
        this.userService.cambiarContrasenya(empleadoCambioContrasenya).subscribe(restablecerObserver);
      }

  }
}
