import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITheatersWindow, Months} from 'src/interface';
import { AlertService } from 'src/alert.service';

@Component({
  selector: 'app-theaters-data-window',
  templateUrl: './theaters-data-window.component.html',
  styleUrls: ['./theaters-data-window.component.css']
})
export class TheatersDataWindowComponent implements OnInit {

  movieName: string = this.data.oldName;
  watchYear: number = this.data.oldYear;
  monthSelectValue: number = this.data.oldMonth;
  months = Months;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITheatersWindow, private alertService: AlertService) { }

  changeMovieInTheaters(): void {
    if (!this.watchYear) {
      this.alertService.showAlert('Please enter a valid year!');
      return;
    }

    if (!this.movieName.length) {
      this.alertService.showAlert('Please enter name for this movie!');
      return;
    }

    this.data.changeTheatersDataCallback(this.watchYear, this.movieName, this.monthSelectValue);
  }

  ngOnInit(): void {
  }

}
