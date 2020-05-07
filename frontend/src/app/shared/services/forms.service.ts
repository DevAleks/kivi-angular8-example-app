import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, Observable } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';

import { FormBottom } from '../classes/form-bt-class'
import { ClickForm } from '../classes/click-class'

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  // Переменная и стрим для открытия форм firstForm, topForm, questionForm, callorderForm в модальных окне 
  private clicks = new Subject<ClickForm>(); 
  observableclicks$ = this.clicks.asObservable();

  constructor(private http: HttpClient) { }

  // Передаем в стрим событие открытия формы
  openForm(openClick: ClickForm) {
    this.clicks.next(openClick);
    // this.clicks.next({formtype:4, typeofact:'Проверка !!!'});
    console.log('----- FormsService ------');
    console.log(openClick.typeofform);
    console.log(openClick.typeofact);
  }  

  // Отправка и получение данных с сервера для всех форм
  postForm(formbt: FormBottom): Observable<FormBottom>{         
    const body = {
      name: formbt.name,
      phone: formbt.phone, 
      email: formbt.email, 
      typeofact: formbt.typeofact, 
      promo: formbt.promo,
      typeofform: formbt.typeofform, 
      status: formbt.status,
      text: formbt.text
    };    
    return this.http.post<FormBottom>('http://localhost:80/requests.add.php', body)
      .pipe( // Обработка ошибок
        delay(2000), // Задержка для отображения индикатора загрузки
        retry(2),
        catchError(this.handleError) // Записываем полученные ошибки в специальный объект handleError
      );      
  }

  // Определяем методы для обработки ошибок получения данных с сервера
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Обработка ошибки на стороне клиента или при передаче данных
      console.error('Произошла ошибка:', error.error.message);
    } else {
      // Backend вернул код неудачного запроса
      // Запрос может содержать ключи ошибок
      console.error(
        `Backend вернул код ${error.status}, ` +
        `тело запроса: ${error.error}`);
    }
    // Возвращает наблюдаемый объект с сообщением об ошибке пользователя
    return throwError('Что-то пошло не так; попробуйте снова позднее.');
  }


}
