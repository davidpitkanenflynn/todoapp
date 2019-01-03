import { Component, OnInit } from '@angular/core';
import { Todoitem } from '../todoitem';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  public todoitems = [];
  public checkedButton = "";
  public identifier = 1;

  constructor(private _listingSevice: ListingService) { }

  ngOnInit() {
    //this.todoitems = this._listingSevice.getlistings().subscribe();
    return this._listingSevice.getlistings().subscribe(data => this.todoitems = data);
    //this.identifier = this.todoitems[0].identifier;
    //this.checkedButton = this.todoitems[0].Name;
  }

  getItems() {
    return this.todoitems;
  }

  getSelected() {
    return this.checkedButton;
  }

  editItem(editedText) {
    let p = new Todoitem();
    p.Name = editedText;
    // need to find the smallest integer not in the set
    p.identifier = this.identifier;
    this._listingSevice.editlistings(p).subscribe(() => this._listingSevice.getlistings().subscribe(data => this.todoitems = data));
    
  }

  deleteItem() {
    // then this.checkedButton
    this._listingSevice.lsDeleteItem(this.identifier).subscribe(() => this._listingSevice.getlistings().subscribe(data => this.todoitems = data));
    //this.delay(500);
    //this._listingSevice.getlistings().subscribe(data => this.todoitems = data);
  }

  changeButton(checkButton, identifier) {
    this.checkedButton = checkButton;
    this.identifier = identifier;
  }



}
