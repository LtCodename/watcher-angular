import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectorsPageComponent } from "./directors-page/directors-page.component";


const routes: Routes = [
    {
        path: '',
        component: DirectorsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DirectorsRoutingModule { }
