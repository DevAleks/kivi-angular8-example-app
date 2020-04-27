import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators } from '../../shared/form.validators'
import { FormBottom } from '../../shared/classes/form-bt-class';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  form: FormGroup

  // Виды услуг для селектора в шаблоне
  typeofacts: string[] = ["Рафтинг", "Проведение мероприятий", "Туры / Походы", "Аренда площадок", "Аренда байдарок", "Прогулки на каяках", "Другое"];    

  constructor() { }

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
      order_typeofact: new FormControl('', Validators.required),
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
      name: this.form.value.order_name.trim(), 
      phone: this.form.value.order_phone.trim(),
      email: this.form.value.order_email.trim(),
      typeofact: this.form.value.order_typeofact, 
      text: this.form.value.order_text.trim(), 
      promo: this.form.value.order_promo.trim(),
      typeofform: 6,
      status: false
    }

  }

}
