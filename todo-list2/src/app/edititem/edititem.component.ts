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
  public selected = null;

  constructor(private _listingSevice: ListingService) { }

  ngOnInit() {
    this.loadItems();
  }

  private loadItems(): void {
    this._listingSevice.getlistings().subscribe(data => this.todoitems = data);
  }

  get items() {
    return this.todoitems;
  }

  editItem(editedText) {
    let p = new Todoitem();
    p.Name = editedText;
    p.identifier = this.selected.identifier;
    this._listingSevice.editlistings(p).subscribe(() => this.loadItems());
    
  }

  deleteItem() {
    this._listingSevice.lsDeleteItem(this.selected.identifier).subscribe(() => this.loadItems());
  }

  changeButton(item) {
    this.selected = item;
  }



}
