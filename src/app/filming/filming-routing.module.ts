import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmingPageComponent } from "./filming-page/filming-page.component";


const routes: Routes = [
    {
        path: '',
        component: FilmingPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FilmingRoutingModule { }
