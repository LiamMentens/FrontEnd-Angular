import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lijst } from '../models/lijst.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  Url = "https://localhost:44399/api/lijst/";

  constructor(private http: HttpClient) { }

  getLists(): Observable<Lijst[]>{
    return this.http.get<Lijst[]>(this.Url);
  }

  getListsByGebruikerID(gebruikerID:number):Observable<Lijst[]>{
    return this.http.get<Lijst[]>(this.Url+"");
  }

  addList(list: Lijst){
    return this.http.post<Lijst>(this.Url,list)
  }

  updateLijst(lijstID: number, lijst: Lijst) {
    return this.http.put<Lijst>(this.Url + lijstID, lijst)
  }

  // getListByID(ID:number){
  //   return this.http.get<Lijst>(this.Url+ID)
  // }

  getListByID(ID:number):Observable<any>{
    return this.http.get<any>(this.Url+ID)
  }

  deleteList(ID:number){
    return this.http.delete<Lijst>(this.Url+ID)
  }



}
