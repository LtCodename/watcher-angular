import {Component, OnDestroy, OnInit} from '@angular/core';
import { DirectorsService } from '../services/directors.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
        .pipe(takeUntil(this.notifier))
        .subscribe(
            data => {
              this.showSpinner = false;
              this.directors = data;
              console.log(data);
            },
            () => {
              // error
            }
        );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
