import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatersPageComponent } from './theaters-page/theaters-page.component';
import { TheatersRoutingModule } from "./theaters-routing.module";



@NgModule({
  declarations: [TheatersPageComponent],
  imports: [
    CommonModule,
    TheatersRoutingModule
  ]
})
export class TheatersModule { }
