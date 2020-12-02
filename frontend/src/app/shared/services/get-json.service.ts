import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
//import { enableProdMode } from '@angular/core';

import { JsonInt } from '../interfaces/interfaces';

//enableProdMode();

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {

  constructor(private http: HttpClient) { }

  // Отправка запроса и получение данных из json файла
  getPagesJson(): Observable<JsonInt[]> {
    return this.http.get<JsonInt[]>('/assets/from-server/pages.json')
      .pipe(
        delay(1500), // Делаем задержку для отображения индикатора загрузки
        retry(3), // Пробуем получить успешный ответ 3 раза
        catchError(this.handleError) // Обработка ошибок
      )

  }

  // Определяем объект для обработки ошибок получения данных из файла
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Обработка ошибки на стороне клиента или при передаче данных
      console.error('Произошла ошибка:', error.error.message)
    } else {

      // Backend вернул код неудачного запроса
      // Запрос может содержать ключи ошибок
      console.error(
        `Backend вернул код ${error.status}, ` +
        `тело запроса: ${error.error}`)
    }
    // Возвращает наблюдаемый объект с сообщением об ошибке пользователя
    return throwError(
      'Что-то пошло не так; попробуйте снова позднее.')
  }

}
