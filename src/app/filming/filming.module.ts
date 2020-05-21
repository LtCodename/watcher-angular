import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmingPageComponent } from './filming-page/filming-page.component';
import { FilmingRoutingModule } from "./filming-routing.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MovieModule }  from "../components/movie/movie.module";



@NgModule({
  declarations: [FilmingPageComponent],
  imports: [
    CommonModule,
    FilmingRoutingModule,
    MatProgressSpinnerModule,
    MovieModule
  ]
})
export class FilmingModule { }
