import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../admin/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup

  submitted = false

  message: string

  submitSubcr: Subscription // Переменная для подписки на ответ сервера после попытки авторизации

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['loginAgain']) {
        this.message = 'Пожалуйста, войдите в систему'
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла, войдите заново'
      }      

    })
    this.form = new FormGroup ({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

  submit() {
    if (this.form.invalid) {
      return  
    }  

    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.submitSubcr = this.auth.login(user).subscribe(()=> {
        this.form.reset()
        this.router.navigate(['/admin','dashboard'])
        this.submitted = false      
      }, () => {
        this.submitted = false
    })    

  }

  ngOnDestroy() {
    // удаляем подписку на продолжение получения ответа сервера
    if (this.submitSubcr) {
      this.submitSubcr.unsubscribe()
    }    
  }

}
