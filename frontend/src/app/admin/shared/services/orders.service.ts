import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, catchError, delay} from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { OrderCreateResponse } from '../interfaces'
import { OrdersInt } from 'src/app/shared/interfaces/interfaces'

@Injectable()
export class OrdersService {

    constructor(private http: HttpClient) { }

    create(order: OrdersInt):Observable<OrdersInt> {
        return this.http.post(`${environment.dbUrl}create_order.php`, order)
            .pipe(                
                map((response: OrderCreateResponse) => {
                    return {
                        ...order,
                        id: response.message, // Странная строчка :)
                        date: new Date(order.date) // Нужен ли order.date?.. 
                    }
                }),
                //catchError(this.handleError)
            )
    }

    getOrders():Observable<OrdersInt[]> {
        return this.http.get(`${environment.dbUrl}get_orders.php`)
            .pipe(                
                map(              
                    (response: {[key: string]: any}) => {                        
                  
                        // Прекращаем получение данных если backend вернул ошибку
                        if (response.message === 'ORDERS_NOT_FOUND') {
                            return 
                        }

                        return Object
                            .keys(response)
                            .map(key => ({
                                ...response[key],
                                //id: key,
                                date: new Date(response[key].date)
                            }))                    
                       
                    }                  
                ),
                delay(1000)                  
            )
    }

    removeOrder(id:string):Observable<void> {
        return this.http.delete<void>(`${environment.dbUrl}delete_order.php?id=${id}`)
    }

    getById(id:string):Observable<OrdersInt> {
        return this.http.get<OrdersInt>(`${environment.dbUrl}update_order.php?get_id=${id}`)
            .pipe(                
                map( (order: OrdersInt) => {
                    return {
                        ...order,
                        id,
                        date: new Date(order.date)
                    }
                }),
                //catchError(this.handleError)
            )

    }

    updateOrder(order: OrdersInt):Observable<OrdersInt> {
        return this.http.patch<OrdersInt>(`${environment.dbUrl}update_order.php?update_id=${order.id}`, order)
    }
    
/*
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
*/



}
