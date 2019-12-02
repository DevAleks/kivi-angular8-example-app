import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';

import { ClickForm } from '../../classes/click-class'

@Component({
  selector: 'app-rafting',
  templateUrl: './rafting.component.html',
  styleUrls: ['./rafting.component.css']
})
export class RaftingComponent implements OnInit {

  modal_switcher: boolean; // Свитчер включения окна с формой 

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне формы firstForm
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
  }
  
  ngOnInit() {
  }

}
