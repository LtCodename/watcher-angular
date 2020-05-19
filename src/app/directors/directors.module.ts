import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorsPageComponent } from './directors-page/directors-page.component';
import { DirectorsRoutingModule } from './directors-routing.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [DirectorsPageComponent],
  imports: [
    CommonModule,
    DirectorsRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class DirectorsModule { }
