import { Component, OnInit } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { IDirector } from 'src/app/directors/directors.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPanelService } from '../add-panel.service';

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
      this.showServerMessage(false, "Enter movie name!");
      return;
    }

    if (!this.movieYear) {
      this.showServerMessage(false, "Enter movie release year!");
      return;
    }

    if (!this.directorsSelectValue.length) {
      this.showServerMessage(false, "Select director for a movie!");
      return;
    }

    this.addService.addNewFilmingMovie(this.directorsSelectValue, this.movieName, this.movieYear).then(() => {
      this.movieName = "";
      this.movieYear = "";
      this.directorsSelectValue = "";
      this.showServerMessage(false, "New movie added!");
    }).catch(() => {
      this.showServerMessage(true);
    })
  }

  ngOnInit(): void {
  }

  showServerMessage(error: boolean = false, message: string =  "Updated successfully!"): void {
    if (error) message = "Error!";

    this.serverMessage.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }
}
