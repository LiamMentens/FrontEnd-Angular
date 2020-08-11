import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stem } from '../models/stem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StemService {
  Url = "https://localhost:44399/api/Stem/";
  constructor(private http: HttpClient) { }

  
  addVote(Vote: Stem){
    return this.http.post<Stem>(this.Url,Vote)
  }

  checkVote(lijstID: number, gebruikerID: number){
    return this.http.get<boolean>('https://localhost:44399/api/Stem/checkVote?lijstid=' + lijstID + "&gebruikerid=" + gebruikerID )
  }

  getVotesByItemID(itemID: number):Observable<any>{
    return this.http.get<any>(this.Url+itemID)

  }


}
