import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';

import { JsonObject } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {

  constructor(private http: HttpClient) { }

  // Отправка запроса и получение данных из json файла
  getPagesJson(): Observable<JsonObject[]> {
    return this.http.get<JsonObject[]>('/assets/from-server/pages.json')
      .pipe(
        delay(1500), // Делаем задержку для отображения индикатора загрузки
        retry(3), 
        catchError(this.handleError) 
      )
  }

  // Определяем объект для обработки ошибок получения данных из файла
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {      
      console.error('Произошла ошибка:', error.error.message)
    } else {
      console.error(
        `Backend вернул код ${error.status}, ` +
        `тело запроса: ${error.error}`)
    }
    // Возвращает наблюдаемый объект с сообщением об ошибке пользователя
    return throwError(
      'Что-то пошло не так; попробуйте снова позднее.')
  }

}
