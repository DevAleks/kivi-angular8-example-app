import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';

import { ClickForm } from '../../classes/click-class'

@Component({
  selector: 'app-semeyniy-rafting',
  templateUrl: './semeyniy-rafting.component.html',
  styleUrls: ['./semeyniy-rafting.component.css']
})
export class SemeyniyRaftingComponent implements OnInit {

  modal_switcher: boolean; // Свитчер включения окна с формой 

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
  }

  ngOnInit() {
  }

}
