import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscarsPageComponent } from './oscars-page/oscars-page.component';
import { OscarsRoutingModule } from "./oscars-routing.module";
import { YearComponent } from './year/year.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieModule } from '../components/movie/movie.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OscarsPageComponent, YearComponent],
  imports: [
    CommonModule,
    OscarsRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MovieModule,
    MatProgressBarModule,
    MatIconModule
  ]
})
export class OscarsModule { }
