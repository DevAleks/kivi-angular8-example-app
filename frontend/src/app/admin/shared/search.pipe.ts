import { Pipe, PipeTransform } from "@angular/core";
import { FormBottom } from 'src/app/shared/classes/form-bt-class';

@Pipe({
    name: 'searchOrders'
})
export class SearchPipe implements PipeTransform {
    transform(orders: FormBottom[], search = ''):FormBottom[] {
        if (!search.trim()) {
            return orders
        }

        return orders.filter( order => {
            return order.typeofact.toLowerCase().includes(search.toLowerCase())
        })
    }
}