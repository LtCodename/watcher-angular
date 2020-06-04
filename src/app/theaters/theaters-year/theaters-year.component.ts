import { Component, OnInit, Input } from '@angular/core';
import { ITheaterMonth } from 'src/interface';

@Component({
  selector: 'app-theaters-year',
  templateUrl: './theaters-year.component.html',
  styleUrls: ['./theaters-year.component.css']
})
export class TheatersYearComponent implements OnInit {

  @Input() monthsData: ITheaterMonth[];

  constructor() {}

  ngOnInit(): void {
  }

}
