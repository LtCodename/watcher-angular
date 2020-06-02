import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: AngularFirestore, public fireAuth: AngularFireAuth) { }

  loginUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.fireAuth.signOut();
  }
}
