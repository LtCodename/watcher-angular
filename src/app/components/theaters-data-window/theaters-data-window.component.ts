import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITheatersWindow, Months} from 'src/interface';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITheatersWindow, private message: MatSnackBar) { }

  changeMovieInTheaters(): void {
    if (!this.watchYear) {
      this.showMessage('Please enter a valid year!');
      return;
    }

    if (!this.movieName.length) {
      this.showMessage('Please enter name for this movie!');
      return;
    }

    this.data.changeTheatersDataCallback(this.watchYear, this.movieName, this.monthSelectValue);
  }

  showMessage(mssg: string): void {
    this.message.open(mssg, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }

  ngOnInit(): void {
  }

}
