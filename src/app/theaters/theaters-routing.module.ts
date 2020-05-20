import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheatersPageComponent } from "./theaters-page/theaters-page.component";


const routes: Routes = [
    {
        path: '',
        component: TheatersPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TheatersRoutingModule { }
