import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { FormsService } from '../../services/forms.service';
import { FormBottom } from '../../classes/form-bt-class';
import { ClickForm } from 'src/app/classes/click-class';

@Component({
  selector: 'app-top-form',
  templateUrl: './top-form.component.html',
  styleUrls: ['./top-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TopFormComponent {

  modal_switcher: boolean = false; // Свичер для модальных окон новых форм и "ответов" форм

  subscription: Subscription; // Переменная для подписки на клики по кнопке открытия окна с формой 

  // Виды услуг для селектора в шаблоне
  typeofacts: string[] = ["Рафтинг", "Проведение мероприятий", "Туры / Походы", "Аренда площадок", "Аренда байдарок", "Прогулки на каяках", "Другое"];    

  switcher_valid: boolean = false; // Индикатор попытки валидации формы после клика на кнопку отправки

  switcher: boolean = false; // Индикатор успешного получения данных с сервера

  formValidError: boolean = true; // Статус ошибки валидации формы перед отправкой

  errServ: boolean = false; // Статус ошибки передачи данных формы на сервер

  topFormToServ: FormBottom = new FormBottom(); // Данные вводимого заказа для формы topForm

  receivedFormTop: FormBottom = new FormBottom(); // Данные заказа из формы topForm, полученные с сервера

  topForm: FormGroup; // Объект FormGroup для формы topForm

  loading = false; // Переключатель индикатора загрузки ответа формы

  constructor(private formsService: FormsService) {

    // Слушаем стрим для получения клика по кнопке открытия окна с формой
    this.subscription = formsService.observableclicks$.subscribe((data: ClickForm) => {
      if (data.typeofform == 3) {
        this.modal_switcher = true;
      }      
    }); 

    // Валидация формы
    this.topForm = new FormGroup({
      userTypeofact: new FormControl('', Validators.required),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern("^[а-яА-Яa-zA-Z\ ]*$")
      ]),
      userPhone: new FormControl('', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern("^[0-9\-\+\ \(\)]*$")
      ]),
      userEmail: new FormControl('', Validators.email),
      userPromo: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("^[0-9а-яА-Яa-zA-Z\ ]*$")
      ])      
    });

  }

  // Закрытие формы кликами мыши
  closeForm() {
    this.modal_switcher = false; // Закрываем модальное окно с формой
    this.switcher = false; // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.formValidError = true; // Сбрасываем ошибки валидации формы  
    this.receivedFormTop.status = false; // Сбрасываем ошибку записи данных из формы в БД на сервере
    this.switcher_valid = false; // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"
  }  

  // Закрытие формы кнопкой ESC
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm();
    }
  }

  submitTop() {  
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true; // Кнопка отправки нажата, но форма не прошла валидацию
    // Проверки:
    console.log(this.topForm.controls['userTypeofact'].valid);
    console.log(this.topForm.controls['userName'].valid);
    console.log(this.topForm.controls['userPhone'].valid);
    console.log(this.topForm.controls['userEmail'].valid);
    console.log(this.topForm.controls['userPromo'].valid);
    console.log(this.topForm.value['userTypeofact']);
    console.log(this.topForm.value['userName']);
    console.log(this.topForm.value['userPhone']);
    console.log(this.topForm.value['userEmail']);
    console.log(this.topForm.value['userPromo']);
    console.log(this.switcher);    

    // Условие отправки данных из формы на сервер
    if (this.topForm.controls['userTypeofact'].valid &&
    this.topForm.controls['userName'].valid && 
    this.topForm.controls['userPhone'].valid && 
    this.topForm.controls['userEmail'].valid && 
    this.topForm.controls['userPromo'].valid) 
    {      
      // Заполнение отправляемого на сервер объекта данными из формы
      this.topFormToServ = {
        typeofact: this.topForm.value['userTypeofact'], 
        name: this.topForm.value['userName'].trim(), 
        phone: this.topForm.value['userPhone'].trim(),
        email: this.topForm.value['userEmail'].trim(),
        promo: this.topForm.value['userPromo'].trim(),
        typeofform: 3,
        status: false
      };

      this.loading = true // Включаем отображение индикатора загрузки
      this.switcher = true // Включаем показ окна с результатом отправки формы  

      // Отправка оъекта на сервер и получение ответа от сервера
      this.formsService.postForm(this.topFormToServ)
        .subscribe(
          (data: FormBottom) => {
            this.receivedFormTop = data // Получаем данные с сервера
            this.formValidError = false // Отключаем проверку ошибок валидации для формы
            this.switcher_valid = false // Отключаем вызов проверки ошибок по нажатию кнопки "Отправить заказ"
            this.loading = false // Выключаем отображение индикатора загрузки
          },
          error => {
            console.log(error)
            this.errServ = true // Включаем статус ошибки передачи данных формы на сервер
            this.loading = false // Выключаем отображение индикатора загрузки
          }
        ); 
                       
    }      
        
  }

}
