import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { MovieDataWindowComponent } from './components/movie-data-window/movie-data-window.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ChangeYearWindowComponent } from './components/change-year-window/change-year-window.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { ConfirmWindowComponent } from './components/confirm-window/confirm-window.component';
import { MatCardModule } from '@angular/material/card';
import { AddDirectorsComponent } from './components/add-panel/add-directors/add-directors.component';
import { SearchResultMovieComponent } from './components/search-result-movie/search-result-movie.component';
import { AddFilmingComponent } from './components/add-panel/add-filming/add-filming.component';
import { AddOscarsComponent } from './components/add-panel/add-oscars/add-oscars.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TheatersDataWindowComponent } from './components/theaters-data-window/theaters-data-window.component';
import { AddTheatersComponent } from './components/add-panel/add-theaters/add-theaters.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDataWindowComponent,
    ChangeYearWindowComponent,
    ConfirmWindowComponent,
    AddDirectorsComponent,
    SearchResultMovieComponent,
    AddFilmingComponent,
    AddOscarsComponent,
    TheatersDataWindowComponent,
    AddTheatersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
