import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListingService } from '../listing.service';
import { EdititemComponent } from './edititem.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Todoitem } from '../todoitem';

describe('EdititemComponent', () => {
  let component: EdititemComponent;
  let fixture: ComponentFixture<EdititemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EdititemComponent],
      imports: [HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdititemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('Unit tests on various methods', () => {


  let service: ListingService;
  //let httpMock: HttpTestingController;
  let component: EdititemComponent;// = new EdititemComponent(service);
 
  let arrayL: number;
  let newName: string;
  let tdo: Todoitem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EdititemComponent],
      imports: [HttpClientModule,
        HttpClientTestingModule],
      providers: [ListingService]
    })
      .compileComponents();

    service = TestBed.get(ListingService);
    //httpMock = TestBed.get(HttpTestingController);
    component = new EdititemComponent(service);
    tdo = { Name: 'Latest Add', identifier: 6 }

    spyOn(service, 'editlistings').and.returnValue(of(tdo.identifier));
    spyOn(service, 'lsDeleteItem').and.returnValue(of(tdo.identifier));
  }));



  beforeEach(() => {

    component.todoitems = [
      { Name: 'Finish App', identifier: 1 },
      { Name: 'exercise', identifier: 2 },
      { Name: 'read about agile', identifier: 3 }
    ];

  });

  it('add the item calls correct method in service', () => {
    component.selected = { Name: "Item to delete", identifier: 2 };
    component.deleteItem();
    expect(service.lsDeleteItem).toHaveBeenCalled();
    component.editItem('this is a edited item entry');
    expect(service.editlistings).toHaveBeenCalled();
  });

  



});
