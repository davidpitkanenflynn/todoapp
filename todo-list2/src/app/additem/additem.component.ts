import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Todoitem } from '../todoitem';


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {

  public todoitems: Todoitem[] = [];
  public checkedButton = "";

  constructor(private _listingSevice: ListingService) { }

  ngOnInit() {
    //this.todoitems = this._listingSevice.getlistings().subscribe();
    return this._listingSevice.getlistings().subscribe(data => this.todoitems = data);
  }
  getItems() {
    return this.todoitems;
  }

  getSelected() {
    return this.checkedButton;
  }
  
  changeButton(checkButton) {
    this.checkedButton = checkButton;
  }

  addItem(newItem) {
    let p = new Todoitem();
    p.Name = newItem;
    // need to find the smallest integer not in the set
    p.identifier = this.findSmallestInt();
    this._listingSevice.addlistings(p).subscribe(() => {
      this._listingSevice.getlistings().subscribe(data => this.todoitems = data);
    });
  }

  findSmallestInt(): number {

    let arr1: boolean[] = new Array(this.todoitems.length);

    // initialize the array to be false
    for (var i = 0; i < arr1.length; i++) {
      arr1[i] = false;
    }
    // set integers present to be true
    for (var i = 0; i < arr1.length; i++) {
      if (this.todoitems[i].identifier < this.todoitems.length + 1 ) {

        arr1[this.todoitems[i].identifier - 1] = true;

      }
    }

    let min_num: number = this.todoitems.length + 1;
    // work backwards to find the min number
    for (var i = this.todoitems.length; i > 0; i--) {
      if (!arr1[i - 1]) {
        min_num = i; 
      }
    }
    return min_num;
  }

}



















