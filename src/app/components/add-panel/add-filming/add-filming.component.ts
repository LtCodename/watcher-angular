import { Component, OnInit } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { AddPanelService } from '../add-panel.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { IDirector } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-add-filming',
  templateUrl: './add-filming.component.html',
  styleUrls: ['./add-filming.component.css']
})
export class AddFilmingComponent implements OnInit {

  movieName: string = "";
  movieYear: string = "";
  directors: IDirector[];
  directorsSelectValue: string = "";

  constructor(
      private directorsService: DirectorsService, 
      private alertService: AlertService, 
      private addService: AddPanelService
    ) { 
    this.directorsService.directors$.subscribe((data: IDirector[]) => {
      this.directors = data;
    })
  }

  add(): void {
    if (!this.movieName.length) {
      this.alertService.showAlert("Enter movie name!");
      return;
    }

    if (!this.movieYear) {
      this.alertService.showAlert("Enter movie release year!");
      return;
    }

    if (!this.directorsSelectValue.length) {
      this.alertService.showAlert("Select director for a movie!");
      return;
    }

    this.addService.addNewFilmingMovie(this.directorsSelectValue, this.movieName, parseInt(this.movieYear)).then(() => {
      this.movieName = "";
      this.movieYear = "";
      this.directorsSelectValue = "";
      this.alertService.showAlert("New movie added!");
    }).catch((error) => {
      if (error.message && error.message === "Missing or insufficient permissions.") {
        this.alertService.showAlert(AuthErrorMessage, 7000);
      } else {
        this.alertService.showAlert("Error!");
      }
    })
  }

  ngOnInit(): void {
  }
}
