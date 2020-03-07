import { Component } from '@angular/core';
import { FormsService } from '../../shared/services/forms.service';

import { ClickForm } from '../../shared/classes/click-class'

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.css']
})
export class TopBlockComponent {

  navMobToggle = false // Переключатель состояния мобильного меню

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
    console.log('----- Component ------');
    console.log(openClick.typeofform);
    console.log(openClick.typeofact);
  }

}
