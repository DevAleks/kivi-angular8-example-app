import { Component, ViewEncapsulation, HostListener, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Subscription } from 'rxjs'

import { FormsService } from '../../services/forms.service'
import { FormValidators } from '../../form.validators'
import { Activites } from '../../classes/classes'
import { Orders } from '../../interfaces/interfaces'

@Component({
  selector: 'app-footer-form',
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FooterFormComponent implements OnDestroy {
  
  typeOfActs: Activites = new Activites() // Виды услуг для селектора в шаблоне

  servRespSub: Subscription // Переменная для подписки на ответ сервера после отправки формы

  switcher_valid: boolean = false // Индикатор попытки валидации формы после клика на кнопку отправки
  
  switcher: boolean = false // Индикатор успешного получения данных с сервера

  modal_switcher: boolean = false //Свичер для модальных окон новых форм и "ответов" форм

  formValidError: boolean = true // Статус ошибки валидации формы перед отправкой

  errServ: boolean = false // Статус ошибки передачи данных формы на сервер

  receivedFormFooter: Orders // Данные заказа, полученные с сервера

  footerForm : FormGroup // Объект FormGroup для формы footerForm

  loading = false // Переключатель индикатора загрузки ответа формы

  constructor(private formsService: FormsService) {   

    // Валидация формы
    this.footerForm = new FormGroup({             
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
        userEmail: new FormControl('', Validators.email)      
    })
  }
  
  // Выключаем всплывающие окно нажатием на крестик или кнопку Закрыть окно
  closeForm() {
    this.modal_switcher = false // Закрываем модальное окно с формой
    this.switcher = false // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false // Сбрасываем ошибку работы с сервером 
    this.formValidError = true // Сбрасываем ошибки валидации формы  
    this.switcher_valid = false // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"  
  }

  // Выключаем всплывающие окна нажатием Esc
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm()
    }
  }

  submitFooter() {
    this.errServ = false // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true // Кнопка отправки нажата, но форма не прошла валидацию    

    // Проверяем валидность формы перед отправкой
    if (this.footerForm.invalid) {   
      return
    }     

    // Заполнение отправляемого на сервер объекта данными из формы
    const formfooter = {
      typeOfAct: this.footerForm.value.userTypeofact, 
      name: this.footerForm.value.userName, 
      phone: this.footerForm.value.userPhone,
      email: this.footerForm.value.userEmail,
      typeOfForm: 1,
      status: false
    }

    this.loading = true // Включаем отображение индикатора загрузки
    this.switcher = true // Включаем показ результатов отправки формы

    this.servRespSub = this.formsService.postForm(formfooter)
      .subscribe(
        (data: Orders) => {
          this.receivedFormFooter = data
          this.formValidError = false // Отключаем проверку ошибок валидации для формы
          this.switcher_valid = false // Отключаем вызов проверки ошибок при получении
          this.loading = false // Выключаем отображение индикатора загрузки
          this.footerForm.reset() // Очищаем значения успешно отправленной формы
        },
        error => {
          this.errServ = true
          this.loading = false // Выключаем отображение индикатора загрузки
        }
      )      
    this.modal_switcher = true // Включаем модальное окно для показа результатов отправки формы                 
  }  

  ngOnDestroy() {
    // удаляем подписку на продолжение получения ответа сервера 
    if (this.servRespSub) {
      this.servRespSub.unsubscribe()
    }

  }

}
