import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IMovie } from '../directors.model';
import { DirectorsService } from "../services/directors.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWindowComponent } from 'src/app/components/confirm-window/confirm-window.component';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit, OnChanges {
  showMovies: boolean = false;
  percentage: number = 0;
  confirmWindow: any;

  @Input() name: string;
  @Input() id: string;
  @Input() movies: IMovie[] = [];

  constructor(
    private directorsService: DirectorsService, 
    private serverMessage: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.movies) {
      this.movies = this.movies.sort((a: any, b: any) => {
        return a.year - b.year;
      })
    }

    this.calculatePercentage();
  }

  onDirector(): void {
    this.showMovies = !this.showMovies;
  }

  confirmRemove(): void {
    this.confirmWindow = this.dialog.open(ConfirmWindowComponent, {data: {
      confirm: (id: string) => this.removeDirector(this.id)
    }});
  }

  removeDirector(id: string):void {
    this.directorsService.deleteDirector(id).then(r => {
      this.confirmWindow .close();
      this.showServerMessage();
    }).catch(data => {
      this.showServerMessage(true);
    })
  }

  calculatePercentage(): void {
    const watched = this.movies.filter((elem: IMovie) => elem.watched);
    const percentageRaw = ((watched.length * 100) / this.movies.length) || 0;
    this.percentage = Number(Math.round(percentageRaw));
  }

  toggleFavoritesDirectors(id: string, bookmarked: boolean):void {
    this.directorsService.toggleBookmarkMovie(id, bookmarked).then(r => {
      this.showServerMessage();
    }).catch(data => {
      this.showServerMessage(true);
    })
  }

  toggleWatchedDirectors(id: string, watched: boolean):void {
    this.directorsService.toggleMovieWatchedStatus(id, watched).then(r => {
      this.showServerMessage();
    }).catch(data => {
      this.showServerMessage(true);
    })
  }

  showServerMessage(error: boolean = false): void {
    let message: string = "Updated successfully!";
    if (error) message = "Error!";

    this.serverMessage.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: "right"
    });
  }
}
