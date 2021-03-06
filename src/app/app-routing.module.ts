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
    },
    {
        path: 'theaters',
        loadChildren: () => import('./theaters/theaters.module').then(m => m.TheatersModule)
    },
    {
        path: 'oscars',
        loadChildren: () => import('./oscars/oscars.module').then(m => m.OscarsModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: '**',
        redirectTo: 'directors'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
