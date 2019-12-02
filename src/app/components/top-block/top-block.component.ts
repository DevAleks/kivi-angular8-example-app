import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';

import { ClickForm } from '../../classes/click-class'

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.css']
})
export class TopBlockComponent implements OnInit {

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
    console.log('----- Component ------');
    console.log(openClick.typeofform);
    console.log(openClick.typeofact);
  }

  ngOnInit() {
  }

}