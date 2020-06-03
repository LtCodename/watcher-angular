import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatersPageComponent } from './theaters-page/theaters-page.component';
import { TheatersRoutingModule } from "./theaters-routing.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { TheatersYearComponent } from './theaters-year/theaters-year.component';



@NgModule({
  declarations: [TheatersPageComponent, TheatersYearComponent],
  imports: [
    CommonModule,
    TheatersRoutingModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class TheatersModule { }
