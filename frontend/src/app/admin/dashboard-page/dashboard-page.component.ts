import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../shared/services/orders.service';
import { FormBottom } from 'src/app/shared/classes/form-bt-class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  orders: FormBottom[] = []

  ordersSub: Subscription

  searchStr = ''

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersSub = this.ordersService.getOrders().subscribe( orders => {
      this.orders = orders
    })
  }

  remove(id: string) {

  }

  ngOnDestroy() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe()
    }
    
  }
}