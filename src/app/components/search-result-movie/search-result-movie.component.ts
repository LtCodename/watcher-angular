import { Component, OnInit, Input } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { AddPanelService } from '../add-panel/add-panel.service';
import { OscarsService } from 'src/app/oscars/services/oscars.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { IDirector, IMovie, IOscarMovie, IOscarYear, imdbMovie, Months, ITheaterMovie } from 'src/interface';
import { AlertService } from 'src/alert.service';
import { TheatersService } from 'src/app/theaters/services/theaters.service';

@Component({
  selector: 'app-search-result-movie',
  templateUrl: './search-result-movie.component.html',
  styleUrls: ['./search-result-movie.component.css']
})

export class SearchResultMovieComponent implements OnInit {

  @Input() name: string = "";
  @Input() year: string = "";
  @Input() mode: string = "";

  directorName: string = "";
  directors: IDirector[];
  years: IOscarYear[];
  directorsSelectValue: string = "";
  yearSelectValue: string = "";
  bestSelectValue: boolean = false;
  yearWatchedSelectedValue: number;
  monthWatchedSelectedValue: number;
  months = Months;
  theatersMovies: ITheaterMovie[] = [];

  constructor(
      private directorsService: DirectorsService, 
      private osrcarsService: OscarsService, 
      private alertService: AlertService,
      private addPanelService: AddPanelService,
      private theatersService: TheatersService
    ) {

    this.directorsService.directors$.subscribe((data: IDirector[]) => {
      this.directors = data;
    })

    this.osrcarsService.oscarYears$.subscribe((data: IOscarYear[]) => {
      this.years = data;
    })

    this.theatersService.movies$.subscribe((data: ITheaterMovie[]) => {
      this.theatersMovies = data;
    })
  }

  getMovieData(): void {
    let yearNumber: number = parseInt(this.year);
    this.directorsService.getMovieDataFromIMDBApi(this.name, yearNumber).subscribe((data: imdbMovie[]) => {
      this.directorName = data['Director'];
    })
  }

  addMovie(): void {
    if(this.mode === 'directors') {
      if(!this.directorsSelectValue.length) {
        this.alertService.showAlert('You need to select a director!');
        return;
      }
  
      let moviesByThisDirector: IMovie[] = this.directors.find(elem => elem.id === this.directorsSelectValue).movies;
  
      let foundMovie: IMovie = null;
      if (moviesByThisDirector.length) {
        foundMovie = moviesByThisDirector.find(elem => elem.name === this.name);
      }
  
      if (foundMovie) {
        this.alertService.showAlert('Movie is already exists!');
        return;
      }
  
      this.addPanelService.addNewMovie(this.directorsSelectValue, this.name, parseInt(this.year)).then(r => {
        this.alertService.showAlert('Updated successfully!');
      }).catch((error) => {
        if (error.message && error.message === "Missing or insufficient permissions.") {
          this.alertService.showAlert(AuthErrorMessage, 7000);
        } else {
          this.alertService.showAlert("Error!");
        }
      })
    } else if (this.mode === 'oscars') {
      if(!this.yearSelectValue.length) {
        this.alertService.showAlert('You need to select a year!');
        return;
      }

      let moviesInThisYears: IOscarMovie[] = this.years.find(elem => elem.id === this.yearSelectValue).movies;
  
      let foundMovie: IOscarMovie = null;
      if (moviesInThisYears.length) {
        foundMovie = moviesInThisYears.find(elem => elem.name === this.name);
      }
  
      if (foundMovie) {
        this.alertService.showAlert('Movie is already exists!');
        return;
      }
      
      this.addPanelService.addNewOscarsMovie(this.yearSelectValue, this.name, this.bestSelectValue).then(r => {
        this.alertService.showAlert('Updated successfully!');
      }).catch(error => {
        if (error.message && error.message === "Missing or insufficient permissions.") {
          this.alertService.showAlert(AuthErrorMessage, 7000);
        } else {
          this.alertService.showAlert("Error!");
        }
      })
    } else {
      if(!this.yearWatchedSelectedValue) {
        this.alertService.showAlert('You need to select a year!');
        return;
      }

      if(!this.monthWatchedSelectedValue) {
        this.alertService.showAlert('You need to select a month!');
        return;
      }

      let foundMovie: ITheaterMovie = null;
      foundMovie = this.theatersMovies.find(elem => elem.name === this.name);
  
      if (foundMovie) {
        this.alertService.showAlert('Movie is already exists!');
        return;
      }
      
      this.addPanelService.addNewTheatersMovie(
        this.name, 
        parseInt(this.year), 
        this.yearWatchedSelectedValue, 
        this.monthWatchedSelectedValue).then(r => {
          this.alertService.showAlert('Updated successfully!');
      }).catch(error => {
        if (error.message && error.message === "Missing or insufficient permissions.") {
          this.alertService.showAlert(AuthErrorMessage, 7000);
        } else {
          this.alertService.showAlert("Error!");
        }
      })
    }
  }

  ngOnInit(): void {
  }
}
