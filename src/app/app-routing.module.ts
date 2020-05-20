import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'directors',
        loadChildren: () => import('./directors/directors.module').then(m => m.DirectorsModule)
    },
    {
        path: 'filming',
        loadChildren: () => import('./filming/filming.module').then(m => m.FilmingModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
