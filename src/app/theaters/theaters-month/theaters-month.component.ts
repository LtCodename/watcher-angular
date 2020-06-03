import { Component, OnInit, Input } from '@angular/core';
import { ITheaterMovie } from '../theaters-page/theaters-page.component';

@Component({
  selector: 'app-theaters-month',
  templateUrl: './theaters-month.component.html',
  styleUrls: ['./theaters-month.component.css']
})
export class TheatersMonthComponent implements OnInit {

  @Input() name: string = "";
  @Input() movies: ITheaterMovie[] = [];

  names = {
    1: 'January',
    2: 'February',
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8:  "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
