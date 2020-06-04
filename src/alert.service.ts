import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alert: MatSnackBar) { }

  showAlert(msg: string, time: number = 3000): void {
    this.alert.open(msg, 'Dismiss', {
      duration: time,
      horizontalPosition: "right"
    });
  }
}
