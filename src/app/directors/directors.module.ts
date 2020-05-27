import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorsPageComponent } from './directors-page/directors-page.component';
import { DirectorsRoutingModule } from './directors-routing.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DirectorComponent } from './director/director.component';
import { MatButtonModule } from "@angular/material/button";
import { MovieModule } from "../components/movie/movie.module";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [DirectorsPageComponent, DirectorComponent],
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MovieModule,
    MatProgressBarModule
  ]
})
export class DirectorsModule { }
