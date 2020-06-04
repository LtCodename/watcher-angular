import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorsPageComponent } from './directors-page/directors-page.component';
import { DirectorsRoutingModule } from './directors-routing.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DirectorComponent } from './director/director.component';
import { MatButtonModule } from "@angular/material/button";
import { MovieModule } from "../components/movie/movie.module";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [DirectorsPageComponent, DirectorComponent],
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MovieModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class DirectorsModule { }
