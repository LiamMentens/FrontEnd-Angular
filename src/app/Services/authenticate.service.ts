import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Gebruiker } from '../models/gebruiker.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  
  public isLoggedin = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) {
    if (localStorage.getItem('token') != null){
      this.isLoggedin.next(true);
    }
   }
  authenticate(userLogin: Login): Observable<Gebruiker>{
    return this._httpClient.post<Gebruiker>("https://localhost:44399/api/Gebruiker/authenticate", userLogin)
  }

  isLoggedIn(){
    if(localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }

 
}