import { Pipe, PipeTransform } from "@angular/core";
import { Orders } from 'src/app/shared/interfaces/interfaces';

@Pipe({
    name: 'searchOrders'
})
export class SearchPipe implements PipeTransform {
    transform(orders: Orders[], search = ''): Orders[] {
        if (!search.trim()) {
            return orders
        }

        return orders.filter( order => {
            return order.typeOfAct.toLowerCase().includes(search.toLowerCase())
        })
    }
}
