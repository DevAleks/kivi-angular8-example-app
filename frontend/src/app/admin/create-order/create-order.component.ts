import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormValidators } from '../../shared/form.validators'
import { FormBottom } from '../../shared/classes/form-bt-class';
import { OrdersService } from '../shared/services/orders.service';
import { AlertService } from '../shared/services/alert.service';
import { Activites } from 'src/app/shared/classes/classes';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  form: FormGroup

  createSub: Subscription

  typeofacts: Activites = new Activites() // Виды услуг для селектора в шаблоне

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
      order_typeofact: new FormControl(null, Validators.required),
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

    //console.log('Form is valid')

    const order: FormBottom = {      
      name: this.form.value.order_name, 
      phone: this.form.value.order_phone,
      email: this.form.value.order_email,
      typeofact: this.form.value.order_typeofact, 
      text: this.form.value.order_text, 
      promo: this.form.value.order_promo,
      typeofform: 6
    }

    // console.log(order)

    this.createSub = this.ordersService.create(order).subscribe(()=> {
      //console.log('Новый заказ отправлен на бекэнд')
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
