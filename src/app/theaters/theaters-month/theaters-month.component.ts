import { Component, OnInit, Input } from '@angular/core';
import { ITheaterMovie, MonthsNames } from 'src/interface';

@Component({
  selector: 'app-theaters-month',
  templateUrl: './theaters-month.component.html',
  styleUrls: ['./theaters-month.component.css']
})
export class TheatersMonthComponent implements OnInit {

  @Input() name: string = "";
  @Input() movies: ITheaterMovie[] = [];

  names = MonthsNames;

  constructor() { }

  ngOnInit(): void {
  }

}
