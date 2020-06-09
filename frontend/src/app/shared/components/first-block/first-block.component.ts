import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { GetJsonService } from '../../services/get-json.service'
import { FormsService } from '../../services/forms.service'
import { ClickInt } from '../../interfaces/interfaces'

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.css']  
})

export class FirstBlockComponent implements OnInit, OnDestroy {
  
  //h1:any // Заголовок h1

  h1: string
  
  modal_switcher: boolean // Свитчер включения окна с формой  
  
  loading = false // Переключатель индикатора загрузки заголовка h1

  jsonSub: Subscription // Переменная для подписки на получение заголовка h1 из json файла

  // Images LazyLoader
  // Рафтинг
  defaultImage1 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad1 = '../../assets/img/icons/rafting.jpg' 

  // Аренда площадок
  defaultImage2 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad2 = '../../assets/img/icons/arenda-ploshadok-dlya-meropriyatiy.jpg'   

  // Проведение мероприятий
  defaultImage3 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad3 = '../../assets/img/icons/provedenie-meropriyatiy.jpg'

  // Аренда байдарок и каяков
  defaultImage4 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad4 = '../../assets/img/icons/arenda-baydarok-i-kayakov.jpg'
  
   // Туры, походы
  defaultImage5 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad5 = '../../assets/img/icons/turi-pohodi.jpg'

  // Другие активности
  defaultImage6 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad6 = '../../assets/img/icons/drugie-aktivnosti.jpg'  

  // Подарочные сертификаты
  defaultImage7 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad7 = '../../assets/img/podarochnie-sertifikati.jpg'

  constructor(
    private getjsonService: GetJsonService, 
    private formsService: FormsService
  ) { }

  // Обрабатываем клики для открытия формы firstForm в модальном окне
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)
  }

  ngOnInit() {
    // Включаем отображение индикатора загрузки заголовка Hh1
    this.loading = true 
    // Получаем значение для заголовка h1 из json файла
    this.jsonSub = this.getjsonService.getPagesJson()
      .subscribe(
        (data) => {
          this.h1 = data["index"][0]["h1"]
          this.loading = false // Выключаем отображение индикатора загрузки заголовка h1
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
