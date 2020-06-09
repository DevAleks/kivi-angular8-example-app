import { Pipe, PipeTransform } from "@angular/core";
import { OrdersInt } from 'src/app/shared/interfaces/interfaces';

@Pipe({
    name: 'searchOrders'
})
export class SearchPipe implements PipeTransform {
    transform(orders: OrdersInt[], search = ''):OrdersInt[] {
        if (!search.trim()) {
            return orders
        }

        return orders.filter( order => {
            return order.typeofact.toLowerCase().includes(search.toLowerCase())
        })
    }
}
