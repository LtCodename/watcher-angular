import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IConfirmWindow } from 'src/interface';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css']
})
export class ConfirmWindowComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmWindow) { }

  ngOnInit(): void {
  }

  confirmAction(): void {
    this.data.confirm();
  }

}
