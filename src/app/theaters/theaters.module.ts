import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatersPageComponent } from './theaters-page/theaters-page.component';
import { TheatersRoutingModule } from "./theaters-routing.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [TheatersPageComponent],
  imports: [
    CommonModule,
    TheatersRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class TheatersModule { }
