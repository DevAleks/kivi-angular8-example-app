import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FormsService } from './forms.service';
import { FormBottom } from '../classes/form-bt-class' // Класс для форм и отправки данных на сервер
import { ClickForm } from '../classes/click-class'

describe('FormsService', () => {

  let httpTestingController: HttpTestingController;
  let formsService: FormsService;

  beforeEach(() => {    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormsService]
    });
    formsService = TestBed.get(FormsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject(
    [FormsService], 
    (service: FormsService) => {
    expect(service).toBeTruthy();
  }));

  it('подписка на клик для открытия форм работает', fakeAsync( 
    inject([FormsService], (service: FormsService) => {
      const click: ClickForm ={
        typeofform: 2,
        typeofact: 'Рафтинг'
      }
      const expectedData: ClickForm ={
        typeofform: 2,
        typeofact: 'Рафтинг'
      }
      service.openForm(click);
      service.observableclicks$.subscribe((data) => {
        expect(data).toBe(expectedData);               
      });
      tick(5000);        
  })));

  // Проверяем отправку данных из форм по Http
  it('Can test with emulated response HttpClient.Post', () => { 

    const body: FormBottom = {
      "name":'Alex', 
      "phone":'+7(921) 354-90 17',
      "email": 'sdfsdf@mail.com',
      "typeofact": 'Рафтинг',
      "typeofform": 1,
      "status": false,
      "promo": 'Promo 2019',
      "text": 'Текст вопроса 123'
    };
    const expectedData: FormBottom = {
      "name":'Имя: Alex', 
      "phone":'Телефон: +7(921) 354-90 17',
      "email": 'Email: sdfsdf@mail.com',
      "typeofact": 'Тип активности: Рафтинг',
      "typeofform": 1,
      "status": false,
      "promo": 'Promo: Promo 2019',
      "text": 'Вопрос: Текст вопроса 123123'
    };

    formsService.postForm(body).subscribe(response => 
      expect(response).toEqual(expectedData)
    ); 

    const req = httpTestingController.expectOne('http://localhost:80/requests.add.php'); 
    expect(req.request.method).toEqual('POST'); 
    req.flush(expectedData);

  });
  afterEach(() => httpTestingController.verify());
});
