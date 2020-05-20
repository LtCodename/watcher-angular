import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscarsPageComponent } from './oscars-page/oscars-page.component';
import { OscarsRoutingModule } from "./oscars-routing.module";



@NgModule({
  declarations: [OscarsPageComponent],
  imports: [
    CommonModule,
    OscarsRoutingModule
  ]
})
export class OscarsModule { }
