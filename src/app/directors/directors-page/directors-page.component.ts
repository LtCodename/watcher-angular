import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirectorsService } from '../services/directors.service';
import { Subject } from "rxjs";
import { map, mergeMap, takeUntil, skip, tap } from "rxjs/operators";
import { IDirector } from "../directors.model";

@Component({
    selector: 'app-directors-page',
    templateUrl: './directors-page.component.html',
    styleUrls: ['./directors-page.component.css']
})
export class DirectorsPageComponent implements OnInit, OnDestroy {
    private notifier = new Subject();
    directors: IDirector[] = [];
    showSpinner = true;

    constructor(private directorsService: DirectorsService) {
        this.directorsService.directors$
            .pipe(
                takeUntil(this.notifier),
                mergeMap(
                    (directorData) => this.directorsService.movies$
                        .pipe(
                            map((movieData) => [directorData, movieData])
                        )
                )
            )
            .subscribe(([directorData, movieData]) => {
                directorData.forEach((director: IDirector) => {
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
