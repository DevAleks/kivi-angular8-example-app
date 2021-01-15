import { Component, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { FormGroup, FormControl, Validators} from '@angular/forms'

import { FormsService } from '../../services/forms.service'
import { FormValidators } from '../../form.validators'
import { ClickInterface, Orders } from '../../interfaces/interfaces'

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstFormComponent implements OnDestroy {

  modal_switcher: boolean = false // Свичер для модальных окон новых форм и "ответов" форм

  typeOfAct: string = '' // Переменная для выбранной услуги

  clicksSub: Subscription // Переменная для подписки на клики по кнопке открытия окна с формой 

  servRespSub: Subscription // Переменная для подписки на ответ сервера после отправки формы 

  switcher_valid: boolean = false // Индикатор попытки валидации формы после клика на кнопку отправки

  switcher: boolean = false // Индикатор успешного получения данных с сервера

  formValidError: boolean = true // Статус ошибки валидации формы перед отправкой

  errServ: boolean = false // Статус ошибки передачи данных формы на сервер

  receivedFormFirst: Orders // Данные заказа из формы firstForm, полученные с сервера

  firstForm : FormGroup // Объект FormGroup для формы firstForm

  loading = false // Переключатель индикатора загрузки ответа формы
 
  constructor(private formsService: FormsService) {  
    
    // Слушаем стрим для получения клика по кнопке открытия окна с формой
    this.clicksSub = formsService.observableclicks$.subscribe((data: ClickInterface) => {      
      if (data.typeOfForm == 2) {
        this.modal_switcher = true
        this.typeOfAct = data.typeOfAct
      }      
    }) 

    // Валидация формы
    this.firstForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        FormValidators.userName
      ]),
      userPhone: new FormControl('', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(20),
        FormValidators.userPhone
      ]),
      userEmail: new FormControl('', Validators.email),
      userPromo: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(30),
        FormValidators.userPromo
      ])      
    }) 
  }

  // Закрытие формы кликами мыши
  closeForm() {
    this.modal_switcher = false // Закрываем модальное окно с формой
    this.switcher = false // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false // Сбрасываем ошибку работы с сервером 
    this.formValidError = true // Сбрасываем ошибки валидации формы  
    this.switcher_valid = false // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"
  }  

  // Закрытие формы кнопкой ESC
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm()
    }
  }

  submitFirst() {  
    this.errServ = false // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true // Кнопка отправки нажата, но форма не прошла валидацию    

    // Проверяем валидность формы перед отправкой
    if (this.firstForm.invalid) {  
      return
    }    

    // Заполнение отправляемого на сервер объекта данными из формы
    const formFirst = {
      typeOfAct: this.typeOfAct, 
      name: this.firstForm.value.userName, 
      phone: this.firstForm.value.userPhone,
      email: this.firstForm.value.userEmail,
      promo: this.firstForm.value.userPromo,
      typeOfForm: 2,
      status: false
    }

    this.loading = true // Включаем отображение индикатора загрузки
    this.switcher = true // Включаем показ окна с результатом отправки формы

    // Отправка оъекта на сервер и получение ответа от сервера
    this.servRespSub = this.formsService.postForm(formFirst)
    .subscribe(
      (data: Orders) => {
        this.receivedFormFirst = data // Получаем данные с сервера
        this.formValidError = false // Отключаем проверку ошибок валидации для формы
        this.switcher_valid = false // Отключаем вызов проверки ошибок по нажатию кнопки "Отправить заказ"                      
        this.loading = false // Выключаем отображение индикатора загрузки
        this.firstForm.reset() // Очищаем значения успешно отправленной формы
      },
      error => {
        this.errServ = true // Включаем статус ошибки передачи данных формы на сервер
        this.loading = false // Выключаем отображение индикатора загрузки
      }
    )         
  }  

  ngOnDestroy() {
    // удаляем подписку на продолжение получения кликов по кнопке открытия формы
    if (this.clicksSub) {
      this.clicksSub.unsubscribe()
    }

    // удаляем подписку на продолжение получения ответа сервера с данными заказа
    if (this.servRespSub) {
      this.servRespSub.unsubscribe()
    }
  }

}
