import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IChangeYearWindow } from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-change-year-window',
  templateUrl: './change-year-window.component.html',
  styleUrls: ['./change-year-window.component.css']
})
export class ChangeYearWindowComponent implements OnInit {

  releaseYear: number = this.data.oldYear;
  movieName: string = this.data.oldName;
  movieId: string = this.data.id;

  constructor(private alertService: AlertService, @Inject(MAT_DIALOG_DATA) public data: IChangeYearWindow) { }

  sumbitNewReleaseYear(): void {
    let year: number = this.releaseYear;
    if (isNaN(year)) {
      this.alertService.showAlert('Please enter a number!');
      return;
    }

    this.data.changeDataCallback(year, this.movieName, this.movieId);
  }

  ngOnInit(): void {
  }

}
