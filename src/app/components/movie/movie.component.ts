import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() name: string = '';
  @Input() year: number;
  @Input() watched: boolean;
  @Input() bookmarked: boolean = false;
  @Input() director: string = '';
  @Input() directorName: string = '';
  @Input() mode: string = '';
  @Input() showWatchedDirectorButton: boolean = false;
  @Input() showInfoButton: boolean = false;
  @Input() showBookmarkButton: boolean = false;
  @Input() showReleasedButton: boolean = false;

  @Output() addMovieToFavorites: EventEmitter<void> = new EventEmitter();

  constructor() { }

  addToFavorites(): void {
    this.addMovieToFavorites.emit();
  }

  ngOnInit(): void {
  }
}
