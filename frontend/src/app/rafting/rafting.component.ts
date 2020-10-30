import { Component, OnInit } from '@angular/core'
import { FormsService } from '../shared/services/forms.service'
import { ClickInt } from '../shared/interfaces/interfaces'

@Component({
  selector: 'app-rafting',
  templateUrl: './rafting.component.html',
  styleUrls: ['./rafting.component.css']
})
export class RaftingComponent {

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default
    
  lazyLoad0 = '../../assets/img/logo.png' // Logo
  
  lazyLoad1 = '../../assets/img/family.jpg' // Семейный рафтинг 
  
  lazyLoad2 = '../../assets/img/classic.jpg' // Классический рафтинг
  
  lazyLoad3 = '../../assets/img/extrim.jpg' // Экстрим рафтинг

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне формы firstForm
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)    
  }

}
