import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form.validators'
import { FormBottom } from '../../shared/classes/form-bt-class';
import { OrdersService } from '../shared/services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  form: FormGroup

  // Виды услуг для селектора в шаблоне
  typeofacts: string[] = ["Рафтинг", "Проведение мероприятий", "Туры / Походы", "Аренда площадок", "Аренда байдарок", "Прогулки на каяках", "Другое"];    

  constructor(private ordersService: OrdersService) { }

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

    const order: FormBottom = {      
      name: this.form.value.order_name, 
      phone: this.form.value.order_phone,
      email: this.form.value.order_email,
      typeofact: this.form.value.order_typeofact, 
      text: this.form.value.order_text, 
      promo: this.form.value.order_promo,
      typeofform: 6,
      /*status: false*/
    }

    console.log(order)

    this.ordersService.create(order).subscribe(()=> {
      console.log('Новый заказ отправлен на бекэнд')
      this.form.reset()
    })

  }

}
