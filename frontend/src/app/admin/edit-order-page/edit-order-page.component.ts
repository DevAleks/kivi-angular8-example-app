import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from '../shared/services/orders.service';
import { switchMap } from 'rxjs/operators';
import { FormBottom } from 'src/app/shared/classes/form-bt-class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/shared/form.validators';

@Component({
  selector: 'app-edit-order-page',
  templateUrl: './edit-order-page.component.html',
  styleUrls: ['./edit-order-page.component.css']
})
export class EditOrderPageComponent implements OnInit {

  form: FormGroup

  order_id = ''

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap( (params: Params) => {
        return this.orderService.getById(params['id'])
      })
    ).subscribe( (order: FormBottom) => {
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
        order_typeofact: new FormControl(order.typeofact, Validators.required),
        order_text: new FormControl(order.text, [
          Validators.required,
          Validators.maxLength(500)
        ]),
        order_promo: new FormControl(order.promo, [
          Validators.minLength(3),
          Validators.maxLength(30),
          FormValidators.userPromo
        ]) 
      }),
      this.order_id = order.id

    }) 
  }

  submit() {

  }

}
