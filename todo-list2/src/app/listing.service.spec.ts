import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListingService } from './listing.service';
import { Todoitem } from './todoitem';


describe('ListingService', () => {


  let service: ListingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ListingService]


    }).compileComponents

    service = TestBed.get(ListingService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    //let http: HttpClient;
    expect(service).toBeTruthy();
  });

  it('Test getlisings: make sure it calls GET method and returns GET response', () => {
    const dummyList = [{ Name: 'Finish App', identifier: 1 },
    { Name: 'exercise', identifier: 4 },
      { Name: 'read about agile', identifier: 3 }];

    service.getlistings().subscribe(todolist => {
      expect(todolist.length).toBe(3);
      expect(todolist).toEqual(dummyList);
    });

    const request = httpMock.expectOne(service._url);
    expect(request.request.method).toBe('GET');
    //here call request method with dummylist
    request.flush(dummyList);


  });

  it('addlisting calls post method with correct URL', () => {
    const tdo: Todoitem = { Name: 'New list member', identifier: 5 };
    service.addlistings(tdo).subscribe();
    const request = httpMock.expectOne(service._url); // expect this url to have been called 1 time
    expect(request.request.method).toBe('POST'); // expect the method to be POST
    request.flush(tdo); // tells what to return from the request
  });

  it('Delete method calls delete and correct URL', () => {
    //const tdo: Todoitem = { Name: 'New list member', identifier: 5 };
    const delete_identifier: number = 1;
    service.lsDeleteItem(delete_identifier).subscribe();
    const request = httpMock.expectOne(service._deleteUrl + delete_identifier);
    expect(request.request.method).toBe('DELETE');
    request.flush(1);

  });

  it('Edit method calls put and correct URL', () => {
    //const tdo: Todoitem = { Name: 'New list member', identifier: 5 };
    const tdo: Todoitem = { Name: 'New list member', identifier: 5 };
    service.editlistings(tdo).subscribe();
    const request = httpMock.expectOne(service._url + "/" + tdo.identifier);
    expect(request.request.method).toBe('PUT');
    request.flush(1);

  });

});
