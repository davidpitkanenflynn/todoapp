import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListingService } from '../listing.service';
import { Todoitem } from '../todoitem';
import { of } from 'rxjs';
import { TodoItemsComponent } from './todo-items.component';

describe('TodoItemsComponent', () => {
  let component: TodoItemsComponent;
  let fixture: ComponentFixture<TodoItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemsComponent],
      imports : [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('Unit tests on various methods', () => {

  let service: ListingService;
  let httpMock: HttpTestingController;
  let component: TodoItemsComponent = new TodoItemsComponent(service);
  let fixture: ComponentFixture<TodoItemsComponent>;
  let arrayL: number;
  let newName: string;
  let tdo: Todoitem[] = [{ Name: 'Latest Add', identifier: 6 }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemsComponent],
      imports: [HttpClientModule,
        HttpClientTestingModule],
      providers: [ListingService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoItemsComponent);
    service = TestBed.get(ListingService);
    httpMock = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;

    spyOn(service, 'getlistings').and.returnValue(of(tdo));

  }));

  it('check that ngOninit calls the getlistings method', () => {
    fixture.detectChanges();
    expect(service.getlistings).toHaveBeenCalled();
    expect(component.todoitems).toEqual(tdo);
  });


});
