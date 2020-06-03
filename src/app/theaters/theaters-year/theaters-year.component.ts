import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theaters-year',
  templateUrl: './theaters-year.component.html',
  styleUrls: ['./theaters-year.component.css']
})
export class TheatersYearComponent implements OnInit {

  @Input() yearData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
