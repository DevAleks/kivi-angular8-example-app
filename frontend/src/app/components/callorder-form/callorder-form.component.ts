import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';
import { ClickForm } from 'src/app/classes/click-class';

@Component({
  selector: 'app-callorder-form',
  templateUrl: './callorder-form.component.html',
  styleUrls: ['./callorder-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CallorderFormComponent implements OnInit {

  modal_switcher: boolean = false; // Свичер для модальных окон новых форм и "ответов" форм
  subscription: Subscription; // Переменная для подписки на клики по кнопке открытия окна с формой 

  switcher_valid: boolean = false; // Индикатор попытки валидации формы после клика на кнопку отправки
  switcher: boolean = false; // Индикатор успешного получения данных с сервера
  formValidError: boolean = true; // Статус ошибки валидации формы перед отправкой
  errServ: boolean = false; // Статус ошибки передачи данных формы на сервер
  formcallorder: FormBottom = new FormBottom(); // Данные вводимого заказа для формы callorderForm
  receivedFormCallOrder: FormBottom = new FormBottom(); // Данные заказа из формы callorderForm, полученные с сервера
  callorderForm : FormGroup; // Объект FormGroup для формы callorderForm

  constructor(private formsService: FormsService) {

    // Слушаем стрим для получения клика по кнопке открытия окна с формой
    this.subscription = formsService.observableclicks$.subscribe((data: ClickForm) => {
      if (data.typeofform == 4) {
        this.modal_switcher = true;
      }      
    }); 

    // Валидация формы
    this.callorderForm = new FormGroup({
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
      ])
    });
  }

  // Закрытие формы кликами мыши
  closeForm() {
    this.modal_switcher = false; // Закрываем модальное окно с формой
    this.switcher = false; // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.formValidError = true; // Сбрасываем ошибки валидации формы  
    this.receivedFormCallOrder.status = false; // Сбрасываем ошибку записи данных из формы в БД на сервере
    this.switcher_valid = false; // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"
  }  

  // Закрытие формы кнопкой ESC
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm();
    }
  }

  submitCallOrder() {  
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true; // Кнопка отправки нажата, но форма не прошла валидацию
    //console.log(this.callorderForm);
    // Проверки:
    console.log(this.callorderForm.controls['userName'].valid);
    console.log(this.callorderForm.controls['userPhone'].valid);
    console.log(this.callorderForm.value['userName']);
    console.log(this.callorderForm.value['userPhone']);
    //console.log(this.switcher);    

    // Условие отправки данных из формы на сервер
    if (this.callorderForm.controls['userName'].valid && 
    this.callorderForm.controls['userPhone'].valid) 
    { 
        // Заполнение отправляемого на сервер объекта с данными формы
        this.formcallorder = {
          typeofact: 'Заказать звонок', 
          name: this.callorderForm.value['userName'], 
          phone: this.callorderForm.value['userPhone'],
          typeofform: 4,
          status: false
        };

        // Отправка оъекта на сервер и получение ответа от сервера
        this.formsService.postForm(this.formcallorder)
                .subscribe(
                    (data: FormBottom) => {
                      this.receivedFormCallOrder = data; // Получаем данные с сервера
                      this.formValidError = false; // Отключаем проверку ошибок валидации для формы
                      this.switcher_valid = false; // Отключаем вызов проверки ошибок по нажатию кнопки "Отправить заказ"
                    },
                    error => {console.log(error);this.errServ=true;}
                );
    }
    this.switcher = true; // Включаем показ окна с результатом отправки формы    
  }

  ngOnDestroy() {
    // предотвращение утечки памяти при уничтожении компонента
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {    
  }

}
