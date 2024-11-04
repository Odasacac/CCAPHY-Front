import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peticion-realizada',
  standalone: true,
  imports: [],
  templateUrl: './peticion-realizada.component.html',
  styleUrl: './peticion-realizada.component.css'
})
export class PeticionRealizadaComponent 
{
  private dialogRef = inject(MatDialogRef)

  close():void
  {
    this.dialogRef.close();
  }

}
