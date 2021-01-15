import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { GetJsonService } from '../../services/get-json.service'
import { FormsService } from '../../services/forms.service'
import { ClickInterface } from '../../interfaces/interfaces'

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.css']  
})

export class FirstBlockComponent implements OnInit, OnDestroy {
  
  h1: string
  
  isModalSwitcher: boolean // Свитчер включения окна с формой  
  
  isLoading = false // Переключатель индикатора загрузки заголовка h1

  jsonSub: Subscription // Переменная для подписки на получение заголовка h1 из json файла

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default

  lazyLoad0 = '../../assets/img/logo.png' // Logo  
  
  lazyLoad1 = '../../assets/img/icons/rafting.jpg' // Рафтинг
  
  lazyLoad2 = '../../assets/img/icons/arenda-ploshadok-dlya-meropriyatiy.jpg' // Аренда площадок   
  
  lazyLoad3 = '../../assets/img/icons/provedenie-meropriyatiy.jpg' // Проведение мероприятий
  
  lazyLoad4 = '../../assets/img/icons/arenda-baydarok-i-kayakov.jpg' // Аренда байдарок и каяков
  
  lazyLoad5 = '../../assets/img/icons/turi-pohodi.jpg' // Туры, походы
  
  lazyLoad6 = '../../assets/img/icons/drugie-aktivnosti.jpg' // Другие активности 
  
  lazyLoad7 = '../../assets/img/podarochnie-sertifikati.jpg' // Подарочные сертификаты

  constructor(
    private getjsonService: GetJsonService, 
    private formsService: FormsService
  ) { }

  // Обрабатываем клики для открытия формы firstForm в модальном окне
  openFormClick(openClick: ClickInterface) {
    this.formsService.openForm(openClick)
  }

  ngOnInit() {
    // Включаем отображение индикатора загрузки заголовка Hh1
    this.isLoading = true 
    // Получаем значение для заголовка h1 из json файла
    this.jsonSub = this.getjsonService.getPagesJson()
      .subscribe(
        (data) => {
          this.h1 = data["index"][0]["h1"]
          this.isLoading = false // Выключаем отображение индикатора загрузки заголовка h1
        },
        (error:any) => console.log(error)
      )
  }

  ngOnDestroy() {
    // удаляем подписку на продолжение получения заголовка h1 из json файла
    if (this.jsonSub) {
      this.jsonSub.unsubscribe()
    }

  }

}
