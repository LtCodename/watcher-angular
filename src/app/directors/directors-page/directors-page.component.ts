import {Component, OnDestroy, OnInit} from '@angular/core';
import { DirectorsService } from '../services/directors.service';
import { Subject } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-directors-page',
    templateUrl: './directors-page.component.html',
    styleUrls: ['./directors-page.component.css']
})
export class DirectorsPageComponent implements OnInit, OnDestroy {
    private notifier = new Subject();
    directors = [];
    showSpinner = true;

    constructor(private directorsService: DirectorsService) {
        this.directorsService.getDirectors()
            .pipe(
                takeUntil(this.notifier),
                mergeMap((directorData) => this.directorsService.getMovies().pipe(map((movieData) => [directorData, movieData])))
            )
            .subscribe(([directorData, movieData]) => {
                directorData.forEach((director) => {
                    director.movies = movieData.filter(movie => movie.director === director.id);
                });

                this.directors = directorData;
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
