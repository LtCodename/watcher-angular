import { Component, OnInit, Input } from '@angular/core';
import { DirectorsService } from 'src/app/directors/services/directors.service';
import { IDirector, IMovie, IYear } from 'src/app/directors/directors.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPanelService } from '../add-panel/add-panel.service';
import { OscarsService } from 'src/app/oscars/services/oscars.service';
import { IOscarMovie } from 'src/app/oscars/oscars.model';

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
  years: IYear[];
  directorsSelectValue: string = "";
  yearSelectValue: string = "";
  bestSelectValue: boolean = false;

  constructor(
      private directorsService: DirectorsService, 
      private osrcarsService: OscarsService, 
      private serverMessage: MatSnackBar,
      private addPanelService: AddPanelService
    ) {

    this.directorsService.directors$.subscribe((data: IDirector[]) => {
      this.directors = data;
    })

    this.osrcarsService.oscarYears$.subscribe((data: IYear[]) => {
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
        this.showServerMessage('You need to select a director!');
        return;
      }
  
      let moviesByThisDirector: IMovie[] = this.directors.find(elem => elem.id === this.directorsSelectValue).movies;
  
      let foundMovie: IMovie = null;
      if (moviesByThisDirector.length) {
        foundMovie = moviesByThisDirector.find(elem => elem.name === this.name);
      }
  
      if (foundMovie) {
        this.showServerMessage('Movie is already exists!');
        return;
      }
  
      this.addPanelService.addNewMovie(this.directorsSelectValue, this.name, parseInt(this.year)).then(r => {
        this.showServerMessage('Updated successfully!');
      }).catch(e => {
        this.showServerMessage('Error!');
      })
    } else {
      if(!this.yearSelectValue.length) {
        this.showServerMessage('You need to select a year!');
        return;
      }

      let moviesInThisYears: IOscarMovie[] = this.years.find(elem => elem.id === this.yearSelectValue).movies;
  
      let foundMovie: IOscarMovie = null;
      if (moviesInThisYears.length) {
        foundMovie = moviesInThisYears.find(elem => elem.name === this.name);
      }
  
      if (foundMovie) {
        this.showServerMessage('Movie is already exists!');
        return;
      }
      
      this.addPanelService.addNewOscarsMovie(this.yearSelectValue, this.name, this.bestSelectValue).then(r => {
        this.showServerMessage('Updated successfully!');
      }).catch(e => {
        this.showServerMessage('Error!');
      })
    }
  }

  showServerMessage(message: string): void {
    this.serverMessage.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }

  ngOnInit(): void {
  }
}
