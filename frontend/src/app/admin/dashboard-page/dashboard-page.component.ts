import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { OrdersService } from '../shared/services/orders.service'
import { AlertService } from '../shared/services/alert.service'
import { Orders } from 'src/app/shared/interfaces/interfaces'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  orders: Orders[] = []

  ordersSub: Subscription
  
  delSub: Subscription

  searchStr: string = ''

  isNoOrders: boolean // Флаг наличия хотя бы одного заказа

  pageOfItems: Array<any>

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.ordersSub = this.ordersService.getOrders().subscribe( orders => {
      this.orders = orders 
      
      // Проверяем есть ли хотя бы один заказ
      if (!this.orders) {
        this.isNoOrders = true
      } 
    })

  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  remove(id: string) {  

    this.delSub = this.ordersService.removeOrder(id).subscribe( () => {
      this.orders = this.orders.filter( order => order.id !== id)
      this.alertService.warning(`Удален заказ № ${id}`)

      // Проверяем осталься ли хотя бы один заказ после удаления
      if (this.orders.length < 1 && !this.orders.length) {
        this.isNoOrders = true
      }
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
