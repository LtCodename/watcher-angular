import { Component, OnInit } from '@angular/core';
import { TheatersService } from '../services/theaters.service';
import { takeUntil, mergeMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface ITheaterMovie {
  id: string;
  month: number;
  name: string;
  priority: boolean;
  releaseYear?: number;
  watched: boolean;
  year: number;
}

@Component({
  selector: 'app-theaters-page',
  templateUrl: './theaters-page.component.html',
  styleUrls: ['./theaters-page.component.css']
})

export class TheatersPageComponent implements OnInit {

  private notifier = new Subject();
  years: any = [];
  showSpinner = true;
  
  constructor(private theaterService: TheatersService) { 
    this.theaterService.movies$.subscribe((movies: ITheaterMovie[]) => {
      //console.log(movies);
      this.years = [];
      const moviesByYear = {};
      movies.forEach((movie: ITheaterMovie) => {
        moviesByYear[movie.year] = moviesByYear[movie.year] || {};
        moviesByYear[movie.year][movie.month] = moviesByYear[movie.year][movie.month] || [];
        moviesByYear[movie.year][movie.month].push(movie);
      });

      Object.keys(moviesByYear).forEach((yearName: string) => {
        const yearBlueprint = {
          yearName,
          months: []
        }

        for (let i = 1; i <= 12; i++) {
          yearBlueprint.months.push({
            monthName: `${i}`,
            movies: moviesByYear[yearName][`${i}`] || []
          });
        }

        this.years.push(yearBlueprint);
        this.showSpinner = false;
      });

      //console.log(this.years);

      //console.log(moviesByYear);
    }, () => {
      this.showSpinner = false;
    })
  }

  ngOnInit(): void {
  }

}
