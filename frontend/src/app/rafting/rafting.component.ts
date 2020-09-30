import { Component, OnInit } from '@angular/core'
import { FormsService } from '../shared/services/forms.service'
import { ClickInt } from '../shared/interfaces/interfaces'

@Component({
  selector: 'app-rafting',
  templateUrl: './rafting.component.html',
  styleUrls: ['./rafting.component.css']
})
export class RaftingComponent {

  //modal_switcher: boolean; // Свитчер включения окна с формой 

  // Images LazyLoader
  // Семейный рафтинг
  defaultImage1 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad1 = '../../assets/img/family.jpg' 

  // Классический рафтинг
  defaultImage2 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad2 = '../../assets/img/classic.jpg' 

  // Экстрим рафтинг
  defaultImage3 = '../../assets/img/img-ldr-wht-312px.svg'
  lazyLoad3 = '../../assets/img/extrim.jpg' 

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне формы firstForm
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)
  }

}
