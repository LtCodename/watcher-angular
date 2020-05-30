import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDirectorsComponent } from './add-directors/add-directors.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [AddDirectorsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule
  ],
  exports: [AddDirectorsComponent]
})
export class AddPanelModule { }
