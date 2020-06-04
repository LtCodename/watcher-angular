import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ITheatersWindowInterface {
  changeTheatersDataCallback(year: number, name: string, month: number): void;
  oldYear: number;
  oldName: string;
  oldMonth: number;
}

@Component({
  selector: 'app-theaters-data-window',
  templateUrl: './theaters-data-window.component.html',
  styleUrls: ['./theaters-data-window.component.css']
})
export class TheatersDataWindowComponent implements OnInit {

  movieName: string = this.data.oldName;
  watchYear: number = this.data.oldYear;
  monthSelectValue: number = this.data.oldMonth;
  months = [
    {
      name: 'January',
      id: 1
    },
    {
      name: 'February',
      id: 2
    },
    {
      name: 'March',
      id: 3
    },
    {
      name: 'April',
      id: 4
    },
    {
      name: 'May',
      id: 5
    },
    {
      name: 'June',
      id: 6
    },
    {
      name: 'July',
      id: 7
    },
    {
      name: 'August',
      id: 8
    },
    {
      name: 'September',
      id: 9
    },
    {
      name: 'October',
      id: 10
    },
    {
      name: 'November',
      id: 11
    },
    {
      name: 'December',
      id: 12
    }
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITheatersWindowInterface) { }

  changeMovieInTheaters(): void {
    console.log('changing data...')
  }

  ngOnInit(): void {
  }

}
