import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IOscarMovie } from '../oscars.model';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() id: string;
  @Input() movies: any;
  percentage: number = 0;
  bestPictureName: string = "";
  showYearsMovies: boolean = false;
  bestMovieSeen: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePercentage();
    this.calculateBestPicture();
  }

  calculatePercentage(): void {
    const watched = this.movies.filter((elem: IOscarMovie) => elem.watched);
    const percentageRaw = ((watched.length * 100) / this.movies.length) || 0;
    this.percentage = Number(Math.round(percentageRaw));
  }

  calculateBestPicture(): void {
    const best = this.movies.filter((elem: IOscarMovie) => elem.best);
    this.bestPictureName = best.length ? best[0].name : "Unknown";
    this.bestMovieSeen = best.length ? best[0].watched : false;
  }

  showMovies(): void {
    this.showYearsMovies = !this.showYearsMovies;
  }

  ngOnInit(): void {
  }
}
