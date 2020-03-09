import { Component, OnInit } from '@angular/core';
import { GetJsonService } from '../../shared/services/get-json.service';
import { FormsService } from '../../shared/services/forms.service';

import { ClickForm } from '../../shared/classes/click-class'
import { PagesInt } from 'src/app/shared/interfaces/pages-int';

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.css']  
})

export class FirstBlockComponent implements OnInit {
  
  h1:any; // Заголовок h1
  
  modal_switcher: boolean; // Свитчер включения окна с формой  
  
  loading = false; // Переключатель индикатора загрузки заголовка H1

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

  constructor(private getjsonService: GetJsonService, private formsService: FormsService) { }

  // Обрабатываем клики для открытия формы firstForm в модальном окне
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
  }

  ngOnInit() {
    // Включаем отображение индикатора загрузки заголовка H1
    this.loading = true; 
    // Получаем значение для заголовка h1 из json файла
    this.getjsonService.getPagesJson()
    .subscribe(
      (data:PagesInt) => {
        this.h1 = data["index"][0]["h1"]
        this.loading = false // Выключаем отображение индикатора загрузки заголовка H1
      },
      (error:any) => console.log(error)
    );
  }

}
