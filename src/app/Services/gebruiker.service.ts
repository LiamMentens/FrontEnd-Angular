import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gebruiker } from '../models/gebruiker.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {
  Url = "https://localhost:44399/api/gebruiker/";
  constructor(private http: HttpClient) {

   }
   addGebruiker(gebruiker: Gebruiker){
     return this.http.post<Gebruiker>(this.Url, gebruiker);
   }

   getGebruikers(): Observable<Gebruiker[]>{
     return this.http.get<Gebruiker[]>(this.Url);
   }
   
   checkEmail(email: string){
     return this.http.get<boolean>(this.Url+'checkEmail/' + email)
   }
   checkUsername(username: string) {
    return this.http.get<boolean>(this.Url+'checkUsername/' + username);
  }

}
