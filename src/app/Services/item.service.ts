import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  Url = "https://localhost:44399/api/item/";
  constructor(private http: HttpClient) { }


  additem(item:Item){
    return this.http.post<Item>(this.Url,item);
  }

  deleteItem(itemID:number){
    return this.http.delete<Item>(this.Url+itemID);
  }

}
