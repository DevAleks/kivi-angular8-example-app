import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { FormBottom } from 'src/app/shared/classes/form-bt-class';
import { environment } from 'src/environments/environment';
import { OrderCreateResponse } from '../interfaces';

@Injectable()
export class OrdersService {

    constructor(private http: HttpClient) { }

    create(order: FormBottom):Observable<FormBottom> {

        return this.http.post(`${environment.dbUrl}create_order.php`, order)
            .pipe(                
                map((response: OrderCreateResponse) => {
                    return {
                        ...order,
                        id:response.message,
                        date: new Date()
                    }
                }),
                //catchError(this.handleError)
            )
    }

    /*
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
*/

}
