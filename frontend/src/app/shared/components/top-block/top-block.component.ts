import { Component } from '@angular/core'
import { FormsService } from '../../services/forms.service'
import { ClickInt } from '../../interfaces/interfaces'

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.css']
})
export class TopBlockComponent {

  navMobToggle = false // Переключатель состояния мобильного меню

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)
  }

}
