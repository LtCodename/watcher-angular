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
import { AddPanelModule } from './components/add-panel/add-panel.module';
import { ConfirmWindowComponent } from './components/confirm-window/confirm-window.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDataWindowComponent,
    ChangeYearWindowComponent,
    ConfirmWindowComponent
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
    AddPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
