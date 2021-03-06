import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { FormValidators } from '../../shared/form.validators'
import { OrdersService } from '../shared/services/orders.service'
import { AlertService } from '../shared/services/alert.service'
import { Activites } from 'src/app/shared/classes/classes'
import { Orders } from 'src/app/shared/interfaces/interfaces'

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  form: FormGroup

  createSub: Subscription

  typeOfActs: Activites = new Activites() // Виды услуг для селектора в шаблоне

  constructor(
    private ordersService: OrdersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = new FormGroup ({
      order_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        FormValidators.userName
      ]),
      order_phone: new FormControl(null, [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(20),
        FormValidators.userPhone
      ]),
      order_email: new FormControl(null, [
        Validators.email
      ]),
      order_typeOfAct: new FormControl(null, Validators.required),
      order_text: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)
      ]),
      order_promo: new FormControl(null, [
        Validators.minLength(3),
        Validators.maxLength(30),
        FormValidators.userPromo
      ])   
    })
  }

  submit() {
    if (this.form.invalid) {
      return  
    }  

    const order: Orders = {      
      name: this.form.value.order_name, 
      phone: this.form.value.order_phone,
      email: this.form.value.order_email,
      typeOfAct: this.form.value.order_typeOfAct, 
      text: this.form.value.order_text, 
      promo: this.form.value.order_promo,
      typeOfForm: 6
    }

    this.createSub = this.ordersService.create(order).subscribe(()=> {
      this.form.reset()
      this.alertService.success('Новый заказ создан')
    })
  }

  ngOnDestroy() {
    if (this.createSub) {
      this.createSub.unsubscribe()
    } 
    
  }
}
