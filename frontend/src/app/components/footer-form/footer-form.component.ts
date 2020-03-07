import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { FormBottom } from '../../shared/classes/form-bt-class'
import { FormsService } from '../../shared/services/forms.service';
import { FormValidators } from '../../shared/form.validators'

@Component({
  selector: 'app-footer-form',
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FooterFormComponent {

    // Виды услуг для селектора в шаблоне
  typeofacts: string[] = ["Рафтинг", "Проведение мероприятий", "Туры / Походы", "Аренда площадок", "Аренда байдарок", "Прогулки на каяках", "Другое"];  

  switcher_valid: boolean = false; // Индикатор попытки валидации формы после клика на кнопку отправки
  
  switcher: boolean = false; // Индикатор успешного получения данных с сервера

  modal_switcher: boolean = false; //Свичер для модальных окон новых форм и "ответов" форм

  formValidError: boolean = true; // Статус ошибки валидации формы перед отправкой

  errServ: boolean = false; // Статус ошибки передачи данных формы на сервер

  formfooter: FormBottom = new FormBottom(); // Данные вводимого заказа для формы footerForm

  receivedFormFooter: FormBottom = new FormBottom(); // Данные заказа, полученные с сервера

  footerForm : FormGroup; // Объект FormGroup для формы footerForm

  loading = false; // Переключатель индикатора загрузки ответа формы

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
    }); 

  }
  
  // Выключаем всплывающие окно нажатием на крестик или кнопку Закрыть окно
  closeForm() {
    this.modal_switcher = false; // Закрываем модальное окно с формой
    this.switcher = false; // Сбрасываем индикатор успешного получения данных с сервера
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.formValidError = true; // Сбрасываем ошибки валидации формы  
    this.receivedFormFooter.status = false; // Сбрасываем ошибку записи данных из формы в БД на сервере  
    this.switcher_valid = false; // Сбрасываем индикатор валидации формы после клика на кнопку "Отправить заказ"  
  }

  // Выключаем всплывающие окна нажатием Esc
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) { // 27===ESC
      this.closeForm();
    }
  }

  submitFooter() {
    this.errServ = false; // Сбрасываем ошибку работы с сервером 
    this.switcher_valid = true; // Кнопка отправки нажата, но форма не прошла валидацию    
    //this.receivedFormTop['status'] = false;
    //console.log(this.footerForm);
    console.log(this.footerForm.controls['userTypeofact'].valid);
    console.log(this.footerForm.controls['userName'].valid);
    console.log(this.footerForm.controls['userPhone'].valid);
    console.log(this.footerForm.controls['userEmail'].valid);
    console.log(this.footerForm.value['userTypeofact']);
    console.log(this.footerForm.value['userName']);
    console.log(this.footerForm.value['userPhone']);
    console.log(this.footerForm.value['userEmail']);
    //console.log(this.switcher);    

    if (this.footerForm.controls['userTypeofact'].valid &&
    this.footerForm.controls['userName'].valid && 
    this.footerForm.controls['userPhone'].valid && 
    this.footerForm.controls['userEmail'].valid) 
    {        
      // Заполнение отправляемого на сервер объекта данными из формы
      this.formfooter = {
        typeofact: this.footerForm.value['userTypeofact'], 
        name: this.footerForm.value['userName'].trim(), 
        phone: this.footerForm.value['userPhone'].trim(),
        email: this.footerForm.value['userEmail'].trim(),
        typeofform: 1,
        status: false
      };
      
      this.loading = true // Включаем отображение индикатора загрузки
      this.switcher = true // Включаем показ результатов отправки формы

      this.formsService.postForm(this.formfooter)
        .subscribe(
          (data: FormBottom) => {
            this.receivedFormFooter = data
            this.formValidError = false // Отключаем проверку ошибок валидации для формы
            this.switcher_valid = false // Отключаем вызов проверки ошибок при получении
            this.loading = false // Выключаем отображение индикатора загрузки
          },
          error => {
            console.log(error)
            this.errServ = true
            this.loading = false // Выключаем отображение индикатора загрузки
          }
        );                       
      
      this.modal_switcher = true; // Включаем модальное окно для показа результатов отправки формы            
    }
  }  

}
