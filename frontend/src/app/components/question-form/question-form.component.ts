import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormsService } from '../../shared/services/forms.service';
import { FormBottom } from '../../shared/classes/form-bt-class';
import { ClickForm } from 'src/app/shared/classes/click-class';
import { FormValidators } from '../../shared/form.validators'

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionFormComponent {

  modal_switcher: boolean = false; // Свичер для модальных окон новых форм и "ответов" форм

  subscription: Subscription; // Переменная для подписки на клики по кнопке открытия окна с формой 

  switcher_valid: boolean = false; // Индикатор попытки валидации формы после клика на кнопку отправки

  switcher: boolean = false; // Индикатор успешного получения данных с сервера
  
  formValidError: boolean = true; // Статус ошибки валидации формы перед отправкой

  errServ: boolean = false; // Статус ошибки передачи данных формы на сервер

  formquestion: FormBottom = new FormBottom(); // Данные вводимого заказа для формы questionForm

  receivedFormQuestion: FormBottom = new FormBottom(); // Данные заказа из формы questionForm, полученные с сервера

  questionForm : FormGroup; // Объект FormGroup для формы questionForm

  loading = false; // Переключатель индикатора загрузки ответа формы

  constructor(private formsService: FormsService) { 

    // Слушаем стрим для получения клика по кнопке открытия окна с формой
    this.subscription = formsService.observableclicks$.subscribe((data: ClickForm) => {
      if (data.typeofform == 5) {
        this.modal_switcher = true;
      }      
    }); 

    // Валидация формы
    this.questionForm = new FormGroup({
      userPhone: new FormControl('', [
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(20),
        FormValidators.userPhone
      ]),
      userText: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
        FormValidators.userText
      ]),
      userEmail: new FormControl('', Validators.email)  
    });
  }

  // Закрытие формы кликами мыши
  closeForm() {
    this.modal_switcher = false; // Закрываем модальное окно с формой
    this.switcher = false; // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.formValidError = true; // Сбрасываем ошибки валидации формы  
    this.receivedFormQuestion.status = false; // Сбрасываем ошибку записи данных из формы в БД на сервере
    this.switcher_valid = false; // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"
  }  

  // Закрытие формы кнопкой ESC
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm();
    }
  }

  submitQuestion() {  
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true; // Кнопка отправки нажата, но форма не прошла валидацию
    //console.log(this.questionForm);
    // Проверки:
    console.log(this.questionForm.controls['userText'].valid);
    console.log(this.questionForm.controls['userPhone'].valid);
    console.log(this.questionForm.controls['userEmail'].valid);
    console.log(this.questionForm.value['userText']);
    console.log(this.questionForm.value['userPhone']);
    console.log(this.questionForm.value['userEmail']);
    console.log('switcher = ',this.switcher);
    console.log('switcher = ',this.switcher);
    console.log('switcher = ',this.switcher);    

    // Условие отправки данных из формы на сервер
    if (this.questionForm.controls['userText'].valid && 
    this.questionForm.controls['userPhone'].valid &&
    this.questionForm.controls['userEmail'].valid) 
    {    
      // Заполнение отправляемого на сервер объекта данными из формы
      this.formquestion = {
        typeofact: 'Задать вопрос', 
        phone: this.questionForm.value['userPhone'].trim(),
        email: this.questionForm.value['userEmail'].trim(),
        text: this.questionForm.value['userText'].trim(),
        typeofform: 5,
        status: false
      };
      
      this.loading = true // Включаем отображение индикатора загрузки
      this.switcher = true // Включаем показ окна с индикатором загрузки и результатом отправки формы 

      // Отправка оъекта на сервер и получение ответа от сервера
      this.formsService.postForm(this.formquestion)      
        .subscribe(
          (data: FormBottom) => {
            this.receivedFormQuestion = data // Получаем данные с сервера
            this.formValidError = false // Отключаем проверку ошибок валидации для формы
            this.switcher_valid = false // Отключаем вызов проверки ошибок по нажатию кнопки "Отправить заказ"              
            this.loading = false // Выключаем отображение индикатора загрузки                            
          },
          error => {
            console.log(error)
            this.errServ = true // Включаем статус ошибки передачи данных формы на сервер
            this.loading = false // Выключаем отображение индикатора загрузки              
          }
        )

    }
     
  }

}
