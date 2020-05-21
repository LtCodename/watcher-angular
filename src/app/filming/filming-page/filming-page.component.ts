import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilmingService } from "../services/filming.service";
import { Subject } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { IFilmingMovie } from "../filming.model";

@Component({
  selector: 'app-filming-page',
  templateUrl: './filming-page.component.html',
  styleUrls: ['./filming-page.component.css']
})
export class FilmingPageComponent implements OnInit, OnDestroy {
  private notifier = new Subject();
  filming: IFilmingMovie[] = [];
  showSpinner = true;

  constructor(private filmingService: FilmingService ) {
    this.filmingService.getFilming()
        .pipe(
            takeUntil(this.notifier),
            mergeMap((filmingData) => this.filmingService.getDirectors().pipe(map((directorData) => [filmingData, directorData])))
        )
        .subscribe(([filmingData, directorData]) => {
          filmingData.forEach((filmingMovie: IFilmingMovie) => {
            filmingMovie.directorData = directorData.find(director => director.id === filmingMovie.director);
          });
          this.filming = filmingData;
          this.showSpinner = false;
        }, () => {
          this.showSpinner = false;
          // Add some error processing here
        });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
