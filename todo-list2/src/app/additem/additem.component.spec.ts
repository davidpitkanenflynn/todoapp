import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { Todoitem } from '../todoitem';
import { AdditemComponent } from './additem.component';
import { ListingService } from '../listing.service';

describe('AdditemComponent', () => {
  let component: AdditemComponent;
  let fixture: ComponentFixture<AdditemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditemComponent],
      imports: [ HttpClientModule ] 
    })
    .compileComponents();
  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('Unit tests on various methods', () => {
  

  let service: ListingService;
  //let httpMock: HttpTestingController;
  let component: AdditemComponent = new AdditemComponent(service);
  let fixture: ComponentFixture<AdditemComponent>;
  let arrayL: number;
  let newName: string;
  let tdo: Todoitem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditemComponent],
      imports: [HttpClientModule,
        HttpClientTestingModule],
      providers: [ListingService]
    })
      .compileComponents();

    service = TestBed.get(ListingService);
    //httpMock = TestBed.get(HttpTestingController);
    component = new AdditemComponent(service);
    tdo = {Name:'Latest Add', identifier: 6}

    spyOn(service, 'addlistings').and.returnValue(of(tdo));
    
  }));

  

  beforeEach(() => {
    
    component.todoitems = [{ Name: 'Finish App', identifier: 1 },
    { Name: 'exercise', identifier: 2 },
    { Name: 'read about agile', identifier: 3 }];
  });

  it('add the item calls correct method in service', () => {
    component.addItem(tdo);
    expect(service.addlistings).toHaveBeenCalled(); // be nice if could check it called it with the right parameters?
  });

  it('Testing findsmallestint to make sure it returns smallest int of todolist', () => {
    expect(component.findSmallestInt()).toBe(4); // 4 is smallest int not in (1,2,3) the identifiers of component.todoitems

    component.todoitems[2].identifier = 4;
    expect(component.findSmallestInt()).toBe(3); // the smallest int not in 1,2,4
    component.todoitems[0].identifier = 5;
    expect(component.findSmallestInt()).toBe(1); // smallest int in 2,4,5
  });

  

});
