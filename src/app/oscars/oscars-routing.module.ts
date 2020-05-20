import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OscarsPageComponent } from "./oscars-page/oscars-page.component";


const routes: Routes = [
    {
        path: '',
        component: OscarsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OscarsRoutingModule { }
