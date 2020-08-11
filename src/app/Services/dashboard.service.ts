import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '../ViewModels/dashboard.viewModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboard(GebruikerID: number) : Observable<any>{
    return this.http.get<any>('https://localhost:44399/api/Dashboard/' + GebruikerID)
  }
}
