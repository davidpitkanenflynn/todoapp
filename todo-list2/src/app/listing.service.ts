import { Injectable } from '@angular/core';
import { Todoitem } from './todoitem';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ListingService {


  //private _url: string = "/assets/data/todoitems.json";
  _url: string = "/api/Itemizeds";
  _deleteUrl: string = "/api/Itemizeds?identifier=";

  //private _urlPost: string = "https://cors-anywhere.herokuapp.com/http://http://64.34.75.4:60809/api/Itemizeds";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'status': '200'
      //'status': '200',
      //'ok': 'True'
    })
  };

  /**todoitems: Todoitem[] = [
    { id: 1, name: 'Have Fun', finished: true },
    { id: 2, name: 'exercise', finished: true },
    { id: 3, name: 'read about agile', finished: true },
    { id: 4, name: 'Grocery Shop', finished: true },
    { id: 5, name: 'Do taxes', finished: true },
    { id: 6, name: 'Volunteer', finished: true },
    { id: 7, name: 'Get 8 hours of sleep', finished: true },
    { id: 8, name: 'Read Angular', finished: true },
    { id: 9, name: 'Clean Desk', finished: true },
    { id: 10, name: 'Do Laundry', finished: true }
  ]; **/

  
  lsDeleteItem(identifier) {
    //return this.todoitems;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.delete(this._deleteUrl + identifier, httpOptions);// #+ identifier.toString());
  }

  getlistings() {
    //return this.todoitems;
    return this.http.get < Todoitem[] > (this._url);
  }

  addlistings(tdo: Todoitem) {
    //return this.todoitems;
    return this.http.post<Todoitem>(this._url, tdo, this.httpOptions);
  }

  editlistings(tdo: Todoitem) {
    return this.http.put(this._url + "/" + tdo.identifier, tdo);
  }
  constructor(private http: HttpClient) {

  }
}
