import { Component, OnInit } from '@angular/core'
import { FormsService } from '../shared/services/forms.service'
import { ClickInterface } from '../shared/interfaces/interfaces'

@Component({
  selector: 'app-semeyniy-rafting',
  templateUrl: './semeyniy-rafting.component.html',
  styleUrls: ['./semeyniy-rafting.component.css']
})
export class SemeyniyRaftingComponent {

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default

  
  lazyLoad1 = '../../assets/img/semeyniy-rafting.jpg' // Cover background

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickInterface) {
    this.formsService.openForm(openClick)
  }

}
