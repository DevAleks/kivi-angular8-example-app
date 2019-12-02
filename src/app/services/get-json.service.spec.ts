import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GetJsonService } from './get-json.service';
import { PagesInt } from '../interfaces/pages-int';

describe('GetJsonService', () => {

  let httpTestingController: HttpTestingController;
  let getjsonService: GetJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetJsonService]
    })
    getjsonService = TestBed.get(GetJsonService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: GetJsonService = TestBed.get(GetJsonService);
    expect(service).toBeTruthy();
  });

  // Проверяем отправку данных из форм по Http
  it('Can test with emulated response HttpClient.Post', () => { 

    const expectedData: PagesInt = {
      "h1":'Заголовок h1', 
      "videoUrl":'FdsD3H!%he$'
    };

    getjsonService.getPagesJson().subscribe(response => 
      expect(response).toEqual(expectedData)
    ); 

    const req = httpTestingController.expectOne('/assets/from-server/pages.json'); 
    expect(req.request.method).toEqual('GET'); 
    req.flush(expectedData);

  });

  afterEach(() => httpTestingController.verify());

});
