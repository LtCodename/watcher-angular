import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheatersPageComponent } from './theaters-page/theaters-page.component';
import { TheatersRoutingModule } from "./theaters-routing.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { TheatersYearComponent } from './theaters-year/theaters-year.component';
import { TheatersMonthComponent } from './theaters-month/theaters-month.component';
import { MovieModule } from '../components/movie/movie.module';



@NgModule({
  declarations: [TheatersPageComponent, TheatersYearComponent, TheatersMonthComponent],
  imports: [
    CommonModule,
    TheatersRoutingModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MovieModule
  ]
})
export class TheatersModule { }
