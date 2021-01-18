import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'
import { Subscription } from 'rxjs'

import { OrdersService } from '../shared/services/orders.service'
import { FormValidators } from 'src/app/shared/form.validators'
import { AlertService } from '../shared/services/alert.service'
import { Activites } from 'src/app/shared/classes/classes'
import { Orders } from 'src/app/shared/interfaces/interfaces'

@Component({
  selector: 'app-edit-order-page',
  templateUrl: './edit-order-page.component.html',
  styleUrls: ['./edit-order-page.component.css']
})
export class EditOrderPageComponent implements OnInit, OnDestroy {

  form: FormGroup

  order: Orders

  isSubmitted = false

  updateSub: Subscription

  typeOfActs: Activites = new Activites() // Виды услуг для селектора в шаблоне

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap( (params: Params) => {
        return this.orderService.getById(params['id'])
      })
    ).subscribe( (order: Orders) => {
      this.order = order,
      this.form = new FormGroup({
        order_name: new FormControl(order.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          FormValidators.userName
        ]),
        order_phone: new FormControl(order.phone, [
          Validators.required, 
          Validators.minLength(6),
          Validators.maxLength(20),
          FormValidators.userPhone
        ]),
        order_email: new FormControl(order.email, [
          Validators.email
        ]),
        order_typeOfAct: new FormControl(order.typeOfAct, Validators.required),
        order_text: new FormControl(order.text, [
          Validators.required,
          Validators.maxLength(500)
        ]),
        order_promo: new FormControl(order.promo, [
          Validators.minLength(3),
          Validators.maxLength(30),
          FormValidators.userPromo
        ]) 
      })
    }) 
  }

  submit() {
    if(this.form.invalid) {
      return 
    }

    this.isSubmitted = true

    this.updateSub = this.orderService.updateOrder({
      ...this.order,
      name: this.form.value.order_name, 
      phone: this.form.value.order_phone,
      email: this.form.value.order_email,
      typeOfAct: this.form.value.order_typeOfAct, 
      text: this.form.value.order_text, 
      promo: this.form.value.order_promo
    }).subscribe( ()=> {
      this.isSubmitted = false
      this.alertService.warning(`Заказ № ${this.order.id} был обновлен`)
    })

  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe()
    } 
    
  }

}
