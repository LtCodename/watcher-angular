import {Component, OnInit} from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-movie-data-window',
  templateUrl: './movie-data-window.component.html',
  styleUrls: ['./movie-data-window.component.css']
})
export class MovieDataWindowComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: object) { }

  ngOnInit() {
  }

}
