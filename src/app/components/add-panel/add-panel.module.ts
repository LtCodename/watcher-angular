import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDirectorsComponent } from './add-directors/add-directors.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { SearchResultMovieComponent } from '../search-result-movie/search-result-movie.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddFilmingComponent } from './add-filming/add-filming.component';



@NgModule({
  declarations: [AddDirectorsComponent, SearchResultMovieComponent, AddFilmingComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [AddDirectorsComponent, AddFilmingComponent]
})
export class AddPanelModule { }
