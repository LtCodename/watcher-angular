import { Component, OnInit } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { IDirector } from 'src/app/directors/directors.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPanelService } from '../add-panel.service';
import { AuthErrorMessage } from 'src/app/app.component';

@Component({
  selector: 'app-add-filming',
  templateUrl: './add-filming.component.html',
  styleUrls: ['./add-filming.component.css']
})
export class AddFilmingComponent implements OnInit {

  movieName: string = "";
  movieYear: any;
  directors: IDirector[];
  directorsSelectValue: string = "";

  constructor(
      private directorsService: DirectorsService, 
      private serverMessage: MatSnackBar, 
      private addService: AddPanelService
    ) { 
    this.directorsService.directors$.subscribe((data: IDirector[]) => {
      this.directors = data;
    })
  }

  add(): void {
    if (!this.movieName.length) {
      this.showMessage("Enter movie name!");
      return;
    }

    if (!this.movieYear) {
      this.showMessage("Enter movie release year!");
      return;
    }

    if (!this.directorsSelectValue.length) {
      this.showMessage("Select director for a movie!");
      return;
    }

    this.addService.addNewFilmingMovie(this.directorsSelectValue, this.movieName, this.movieYear).then(() => {
      this.movieName = "";
      this.movieYear = "";
      this.directorsSelectValue = "";
      this.showMessage("New movie added!");
    }).catch((error) => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.showMessage(AuthErrorMessage, 7000);
      } else {
        this.showMessage("Error!");
      }
    })
  }

  ngOnInit(): void {
  }

  showMessage(msg: string, time: number = 3000): void {
    this.serverMessage.open(msg, 'Dismiss', {
      duration: time,
      horizontalPosition: "right"
    });
  }
}
