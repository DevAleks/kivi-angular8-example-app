import { Component, HostListener, ViewEncapsulation } from '@angular/core'
import { Subscription } from 'rxjs'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { FormsService } from '../../services/forms.service'
import { FormValidators } from '../../form.validators'
import { Activites } from '../../classes/classes'
import { ClickInterface, Orders } from '../../interfaces/interfaces'

@Component({
  selector: 'app-top-form',
  templateUrl: './top-form.component.html',
  styleUrls: ['./top-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopFormComponent {

  // Свичер для модальных окон новых форм и "ответов" форм
  isModalSwitcher: boolean = false // isModalSwitcherOpen - may be better naming

  // Переменная для подписки на клики по кнопке открытия окна с формой 
  clicksSub: Subscription

  // Переменная для подписки на ответ сервера после отправки формы  
  servRespSub: Subscription

  // Виды услуг для селектора в шаблоне
  typeOfActs: Activites = new Activites() // typeOfActs - may be better naming

  // Индикатор попытки валидации формы после клика на кнопку отправки
  isValidSwitcher: boolean = false // isSwitcherValid  - may be better naming

  // Индикатор успешного получения данных с сервера
  isSuccesAnswer: boolean = false // isSwitcherSucceed - may be better naming

  // Статус ошибки валидации формы перед отправкой
  isFormValidError: boolean = true

  // Статус ошибки передачи данных формы на сервер
  isErrServ: boolean = false // don't use short names for variables

  // Данные заказа из формы topForm, полученные с сервера
  receivedFormTop: Orders

  // Объект FormGroup для формы topForm
  topForm: FormGroup

  // Переключатель индикатора загрузки ответа формы
  isFormLoading: boolean = false

  constructor(private formsService: FormsService) {

    // Слушаем стрим для получения клика по кнопке открытия окна с формой
    this.clicksSub = formsService.observableclicks$.subscribe((data: ClickInterface) => {
      if (data.typeOfForm == 3) {
        this.isModalSwitcher = true
      }
    })

    // Валидация формы
    this.topForm = new FormGroup({
      userTypeofact: new FormControl('', Validators.required),
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
        Validators.maxLength(20),
        FormValidators.userPromo
      ])
    })

  }

  // Закрытие формы кликами мыши
  closeForm() {
    this.isModalSwitcher = false // Закрываем модальное окно с формой
    this.isSuccesAnswer = false // Сбрасываем индикатор успешного получения данных с сервера
    this.isErrServ = false // Сбрасываем ошибку работы с сервером 
    this.isFormValidError = true // Сбрасываем ошибки валидации формы  
    this.isValidSwitcher = false // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"
  }

  // Закрытие формы кнопкой ESC
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm()
    }
  }

  submitTop() {

    this.isErrServ = false // Сбрасываем ошибку работы с сервером 
    this.isValidSwitcher = true // Кнопка отправки нажата, но форма не прошла валидацию

    // Проверяем валидность формы перед отправкой
    if (this.topForm.invalid) {
      return
    }

    // Заполнение отправляемого на сервер объекта данными из формы
    const topFormToServ = {
      typeOfAct: this.topForm.value.userTypeofact,
      name: this.topForm.value.userName,
      phone: this.topForm.value.userPhone,
      email: this.topForm.value.userEmail,
      promo: this.topForm.value.userPromo,
      typeOfForm: 3,
      status: false
    }

    this.isFormLoading = true // Включаем отображение индикатора загрузки
    this.isSuccesAnswer = true // Включаем показ окна с результатом отправки формы    

    // Отправка оъекта на сервер и получение ответа от сервера
    this.servRespSub = this.formsService.postForm(topFormToServ)
      .subscribe(
        (data: Orders) => {
          this.receivedFormTop = data // Получаем данные с сервера
          this.isFormValidError = false // Отключаем проверку ошибок валидации для формы
          this.isValidSwitcher = false // Отключаем вызов проверки ошибок по нажатию кнопки "Отправить заказ"
          this.isFormLoading = false // Выключаем отображение индикатора загрузки
          this.topForm.reset() // Очищаем значения успешно отправленной формы
        },
        error => {
          this.isErrServ = true // Включаем статус ошибки передачи данных формы на сервер
          this.isFormLoading = false // Выключаем отображение индикатора загрузки
        }
      )
  }

  ngOnDestroy() {
    // удаляем подписку на продолжение получения кликов по кнопке открытия формы
    if (this.clicksSub) {
      this.clicksSub.unsubscribe()
    }

    // удаляем подписку на продолжение получения ответа сервера
    if (this.servRespSub) {
      this.servRespSub.unsubscribe()
    }

  }

}
