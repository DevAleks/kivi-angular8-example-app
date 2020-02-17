import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';
import { ClickForm } from '../../classes/click-class'

@Component({
  selector: 'app-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FirstFormComponent implements OnInit {

  modal_switcher: boolean = false; // Свичер для модальных окон новых форм и "ответов" форм
  typeofact: string = ''; // Переменная для выбранной услуги
  subscription: Subscription; // Переменная для подписки на клики по кнопке открытия окна с формой 
  switcher_valid: boolean = false; // Индикатор попытки валидации формы после клика на кнопку отправки
  switcher: boolean = false; // Индикатор успешного получения данных с сервера
  formValidError: boolean = true; // Статус ошибки валидации формы перед отправкой
  errServ: boolean = false; // Статус ошибки передачи данных формы на сервер
  formfirst: FormBottom = new FormBottom(); // Данные вводимого заказа для формы firstForm
  receivedFormFirst: FormBottom = new FormBottom(); // Данные заказа из формы firstForm, полученные с сервера
  firstForm : FormGroup; // Объект FormGroup для формы firstForm
 
  constructor(private formsService: FormsService) {  
    
    // Слушаем стрим для получения клика по кнопке открытия окна с формой
    this.subscription = formsService.observableclicks$.subscribe((data: ClickForm) => {
      if (data.typeofform == 2) {
        this.modal_switcher = true;
        this.typeofact = data.typeofact;
      }      
    }); 

    // Валидация формы
    this.firstForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("[а-яА-Яa-zA-Z]{0,31}")
      ]),
      userPhone: new FormControl('', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern("^[0-9\-\+\ \(\)\s]{0,21}$")
      ]),
      userEmail: new FormControl('', Validators.email),
      userPromo: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("[0-9а-яА-Яa-zA-Z]{0,21}")
      ])      
    }); 

  }

  // Закрытие формы кликами мыши
  closeForm() {
    this.modal_switcher = false; // Закрываем модальное окно с формой
    this.switcher = false; // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.formValidError = true; // Сбрасываем ошибки валидации формы  
    this.receivedFormFirst.status = false; // Сбрасываем ошибку записи данных из формы в БД на сервере
    this.switcher_valid = false; // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"
  }  

  // Закрытие формы кнопкой ESC
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm();
    }
  }

  submitFirst() {  
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true; // Кнопка отправки нажата, но форма не прошла валидацию
    //console.log(this.firstForm);
    // Проверки:
    console.log(this.firstForm.controls['userName'].valid);
    console.log(this.firstForm.controls['userPhone'].valid);
    console.log(this.firstForm.controls['userEmail'].valid);
    console.log(this.firstForm.controls['userPromo'].valid);
    console.log(this.typeofact);
    console.log(this.firstForm.value['userName']);
    console.log(this.firstForm.value['userPhone']);
    console.log(this.firstForm.value['userEmail']);
    console.log(this.firstForm.value['userPromo']);
    //console.log(this.switcher);    

    // Условие отправки данных из формы на сервер
    if ((this.typeofact.length > 0) &&
    this.firstForm.controls['userName'].valid && 
    this.firstForm.controls['userPhone'].valid && 
    this.firstForm.controls['userEmail'].valid && 
    this.firstForm.controls['userPromo'].valid) 
    {      
        // Заполнение отправляемого на сервер объекта с данными формы
        this.formfirst = {
          typeofact: this.typeofact, 
          name: this.firstForm.value['userName'], 
          phone: this.firstForm.value['userPhone'],
          email: this.firstForm.value['userEmail'],
          promo: this.firstForm.value['userPromo'],
          typeofform: 2,
          status: false
        };

        // Отправка оъекта на сервер и получение ответа от сервера
        this.formsService.postForm(this.formfirst)
                .subscribe(
                    (data: FormBottom) => {
                      this.receivedFormFirst=data; // Получаем данные с сервера
                      this.formValidError = false; // Отключаем проверку ошибок валидации для формы
                      this.switcher_valid = false; // Отключаем вызов проверки ошибок по нажатию кнопки "Отправить заказ"                      
                    },
                    error => {console.log(error);this.errServ=true;}
                );
    }
    this.switcher = true; // Включаем показ окна с результатом отправки формы

    //setTimeout(() => this.switcher = true, 2000); // Включаем обработку ошибок отправки данных на сервер

  }  

  ngOnDestroy() {
    // предотвращение утечки памяти при уничтожении компонента
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {   

  } 


}
