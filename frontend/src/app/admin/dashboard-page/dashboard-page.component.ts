import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { FormBottom } from 'src/app/shared/classes/form-bt-class';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  orders: FormBottom[] = []

  ordersSub: Subscription
  
  delSub: Subscription

  searchStr = ''

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.ordersSub = this.ordersService.getOrders().subscribe( orders => {
      this.orders = orders
    })
  }

  remove(id: string) {
    this.delSub = this.ordersService.removeOrder(id).subscribe( () => {
      this.orders = this.orders.filter( order => order.id !== id)
      this.alertService.warning(`Удален заказ № ${id}`)
    })
  }

  ngOnDestroy() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe()
    }

    if (this.delSub) {
      this.delSub.unsubscribe()
    }    
    
  }
}