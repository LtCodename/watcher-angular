import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authToken$: Observable<any>;

  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public fireAuth: AngularFireAuth) {
    this.authToken$ = this.tokenSubject.asObservable();

    this.fireAuth.onAuthStateChanged(user => {
      this.tokenSubject.next(user);
    })
  }

  loginUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.fireAuth.signOut();
  }
}
