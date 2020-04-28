import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBottom } from 'src/app/shared/classes/form-bt-class';
import { environment } from 'src/environments/environment';
import { OrderCreateResponse } from '../interfaces';

@Injectable({providedIn:'root'}) 
export class OrdersService {

    constructor(private http: HttpClient) {

    }

    // 'http://localhost/jwt/api/create_order.php' 

    create(order: FormBottom):Observable<FormBottom> {
        return this.http.post(`${environment.dbUrl}create_order.php`, order)
            .pipe(
                map((response: OrderCreateResponse) => {
                    return {
                        ...order,
                        id:response.name,
                        date: new Date(order.date)
                    }
                })
            )
    }

}
