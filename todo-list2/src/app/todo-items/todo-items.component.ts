import { Component, OnInit } from '@angular/core';
import { Todoitem } from '../todoitem';
import { TODOITEMS } from '../mock-todoitems';
import { ListingService } from '../listing.service';


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  //todoitems = TODOITEMS
  public todoitems = [];

  constructor(private _listingSevice: ListingService) { }

  ngOnInit() {
    //this.todoitems = this._listingSevice.getlistings().subscribe();
    return this._listingSevice.getlistings().subscribe(data => this.todoitems = data);
  }

  getItems() {
    return this.todoitems;
  }

}
