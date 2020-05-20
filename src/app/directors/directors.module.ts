import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorsPageComponent } from './directors-page/directors-page.component';
import { DirectorsRoutingModule } from './directors-routing.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DirectorComponent } from './director/director.component';
import { MatButtonModule } from "@angular/material/button";
import { MovieModule } from "../components/movie/movie.module";

@NgModule({
  declarations: [DirectorsPageComponent, DirectorComponent],
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MovieModule
  ]
})
export class DirectorsModule { }
