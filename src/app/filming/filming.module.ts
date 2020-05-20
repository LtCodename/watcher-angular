import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmingPageComponent } from './filming-page/filming-page.component';
import { FilmingRoutingModule } from "./filming-routing.module";



@NgModule({
  declarations: [FilmingPageComponent],
  imports: [
    CommonModule,
    FilmingRoutingModule
  ]
})
export class FilmingModule { }
