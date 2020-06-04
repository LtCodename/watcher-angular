import { Component, OnInit } from '@angular/core';
import { TheatersService } from '../services/theaters.service';
import { ITheaterMovie } from 'src/interface';

@Component({
  selector: 'app-theaters-page',
  templateUrl: './theaters-page.component.html',
  styleUrls: ['./theaters-page.component.css']
})

export class TheatersPageComponent implements OnInit {

  years: any = [];
  showSpinner = true;
  
  constructor(private theaterService: TheatersService) { 
    this.theaterService.movies$.subscribe((movies: ITheaterMovie[]) => {
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
    }, () => {
      this.showSpinner = false;
    })
  }

  ngOnInit(): void {
  }

}
