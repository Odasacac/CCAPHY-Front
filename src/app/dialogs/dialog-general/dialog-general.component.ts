import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-general.component.html',
  styleUrl: './dialog-general.component.css'
})
export class DialogGeneralComponent 
{
  private dialogRef = inject(MatDialogRef)
  private router = inject(Router);
  private data = inject (MAT_DIALOG_DATA);

  public volverALogin:boolean=this.data.volverALogin;
  public volverAAjustes:boolean=this.data.volverAAjustes;
  public header: String =this.data.header;
  public content: String =this.data.body;


  
  closeLog():void
  {
    this.dialogRef.close();
    this.router.navigate(['/login']); 
  }

  closeAjus():void
  {
    this.dialogRef.close();
    this.router.navigate(['/dashboard/ajustes']); 
  }

}
