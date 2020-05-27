import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OscarsService } from '../services/oscars.service';
import { Subject } from "rxjs";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { IOscarYear } from '../oscars.model';

@Component({
  selector: 'app-oscars-page',
  templateUrl: './oscars-page.component.html',
  styleUrls: ['./oscars-page.component.css']
})
export class OscarsPageComponent implements OnInit, OnChanges {

  private notifier = new Subject();
  years: IOscarYear[] = [];
  showSpinner = true;

  constructor(private oscarsService: OscarsService) {
    this.oscarsService.getYears()
      .pipe(
        takeUntil(this.notifier),
        mergeMap((yearsData) => this.oscarsService.getMovies().pipe(map((movieData) => [yearsData, movieData])))
      )
      .subscribe(([yearsData, movieData]) => {
        yearsData.forEach((year: IOscarYear) => {
          year.movies = movieData.filter(movie => movie.year === year.id)
        })

        this.years = yearsData.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        this.showSpinner = false;
      }, () => {
        this.showSpinner = false;
        // Add some error processing here
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.years) {
      this.years = this.years.sort((a: any, b: any) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      })
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
