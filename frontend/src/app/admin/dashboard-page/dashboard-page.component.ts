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

  typeofform: string

  ordersSub: Subscription

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.ordersSub = this.ordersService.getOrders().subscribe( orders => {
      this.orders = orders
    })

    // Настраиваем вывод типов форм словами
    switch(this.orders['typeofform']) { 
      case 1: { 
        this.typeofform = "1"
        break; 
      } 
      case 2: { 
        this.typeofform = "Форма в<br>круглом блоке" 
        break; 
      } 
      case 3: {
        this.typeofform = "3" 
        break;    
      } 
      case 4: { 
        this.typeofform = "4" 
        break; 
      }
      case 5: { 
        this.typeofform = "5" 
        break; 
      }
      case 6: { 
        this.typeofform = "6" 
        break; 
      }             
      default: { 
        this.typeofform = "<span class='red'>Форма не<br>определена!</span>" 
        break;              
      } 
    
    }

  }

  remove(id: string) {

  }

  ngOnDestroy() {
    if (this.ordersSub) {
      this.ordersSub.unsubscribe()
    }
    
  }
}
