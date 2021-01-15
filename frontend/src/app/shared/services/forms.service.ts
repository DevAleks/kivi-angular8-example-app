import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Subject, throwError, Observable } from 'rxjs'
import { catchError, retry, delay } from 'rxjs/operators'

import { ClickInterface, Orders } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  // Переменная и стрим для открытия форм firstForm, topForm, questionForm, callorderForm в модальных окне 
  private clicks = new Subject<ClickInterface>()
  observableclicks$ = this.clicks.asObservable()

  constructor(private http: HttpClient) { }

  // Передаем в стрим событие открытия формы
  openForm(openClick: ClickInterface) {
    this.clicks.next(openClick)
  }

  // Отправка и получение данных с сервера для всех форм
  postForm(formbt: Orders): Observable<Orders> {
    const body = {
      name: formbt.name ? formbt.name.trim() : '',
      phone: formbt.phone ? formbt.phone.trim() : '',
      email: formbt.email ? formbt.email.trim() : '',
      typeOfAct: formbt.typeOfAct,
      promo: formbt.promo ? formbt.promo.trim() : '',
      typeOfForm: formbt.typeOfForm,
      status: formbt.status,
      text: formbt.text ? formbt.text.trim() : ''
    }
    return this.http.post<Orders>('http://localhost:80/requests.add.php', body)
      .pipe(
        delay(2000), // Задержка для отображения индикатора загрузки
        retry(2), // Пробуем получить успешный ответ 2 раза  
        catchError(this.handleError) // Обработка ошибок
      )
  }

  // Определяем методы для обработки ошибок получения данных с сервера
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
    return throwError('Что-то пошло не так; попробуйте снова позднее.')
  }
}
