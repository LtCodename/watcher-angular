import { Component, OnInit, Input } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPanelService } from '../add-panel/add-panel.service';
import { OscarsService } from 'src/app/oscars/services/oscars.service';
import { AuthErrorMessage } from 'src/app/app.component';
import { IDirector, IMovie, IOscarMovie, IOscarYear } from 'src/interface';

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

  constructor(
      private directorsService: DirectorsService, 
      private osrcarsService: OscarsService, 
      private serverMessage: MatSnackBar,
      private addPanelService: AddPanelService
    ) {

    this.directorsService.directors$.subscribe((data: IDirector[]) => {
      this.directors = data;
    })

    this.osrcarsService.oscarYears$.subscribe((data: IOscarYear[]) => {
      this.years = data;
    })
  }

  getMovieData(): void {
    let yearNumber: number = parseInt(this.year);
    this.directorsService.getMovieDataFromIMDBApi(this.name, yearNumber).subscribe((data: any) => {
      this.directorName = data['Director'];
    })
  }

  addMovie(): void {
    if(this.mode === 'directors') {
      if(!this.directorsSelectValue.length) {
        this.showMessage('You need to select a director!');
        return;
      }
  
      let moviesByThisDirector: IMovie[] = this.directors.find(elem => elem.id === this.directorsSelectValue).movies;
  
      let foundMovie: IMovie = null;
      if (moviesByThisDirector.length) {
        foundMovie = moviesByThisDirector.find(elem => elem.name === this.name);
      }
  
      if (foundMovie) {
        this.showMessage('Movie is already exists!');
        return;
      }
  
      this.addPanelService.addNewMovie(this.directorsSelectValue, this.name, parseInt(this.year)).then(r => {
        this.showMessage('Updated successfully!');
      }).catch((error) => {
        if (error.message && error.message === "Missing or insufficient permissions.") {
          this.showMessage(AuthErrorMessage, 7000);
        } else {
          this.showMessage("Error!");
        }
      })
    } else if (this.mode === 'oscars') {
      if(!this.yearSelectValue.length) {
        this.showMessage('You need to select a year!');
        return;
      }

      let moviesInThisYears: IOscarMovie[] = this.years.find(elem => elem.id === this.yearSelectValue).movies;
  
      let foundMovie: IOscarMovie = null;
      if (moviesInThisYears.length) {
        foundMovie = moviesInThisYears.find(elem => elem.name === this.name);
      }
  
      if (foundMovie) {
        this.showMessage('Movie is already exists!');
        return;
      }
      
      this.addPanelService.addNewOscarsMovie(this.yearSelectValue, this.name, this.bestSelectValue).then(r => {
        this.showMessage('Updated successfully!');
      }).catch(error => {
        if (error.message && error.message === "Missing or insufficient permissions.") {
          this.showMessage(AuthErrorMessage, 7000);
        } else {
          this.showMessage("Error!");
        }
      })
    } else {
      if(!this.yearWatchedSelectedValue) {
        this.showMessage('You need to select a year!');
        return;
      }

      if(!this.monthWatchedSelectedValue) {
        this.showMessage('You need to select a month!');
        return;
      }

      //TODO checl movie for duplicates
      
      this.addPanelService.addNewTheatersMovie(
        this.name, 
        parseInt(this.year), 
        this.yearWatchedSelectedValue, 
        this.monthWatchedSelectedValue).then(r => {
        this.showMessage('Updated successfully!');
      }).catch(error => {
        if (error.message && error.message === "Missing or insufficient permissions.") {
          this.showMessage(AuthErrorMessage, 7000);
        } else {
          this.showMessage("Error!");
        }
      })
    }
  }

  showMessage(msg: string, time: number = 3000): void {
    this.serverMessage.open(msg, 'Dismiss', {
      duration: time,
      horizontalPosition: "right"
    });
  }

  ngOnInit(): void {
  }
}
