import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../services/forms.service';

import { ClickForm } from '../../classes/click-class'

@Component({
  selector: 'app-footer-block',
  templateUrl: './footer-block.component.html',
  styleUrls: ['./footer-block.component.css']
})

export class FooterBlockComponent implements OnInit {

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм questionForm, callorderForm
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
  }

  ngOnInit() {
  }

}


