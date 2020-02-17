import { Component, OnInit } from '@angular/core';
import { GetJsonService } from '../../services/get-json.service';
import { FormsService } from '../../services/forms.service';

import { ClickForm } from '../../classes/click-class'

@Component({
  selector: 'app-first-block',
  templateUrl: './first-block.component.html',
  styleUrls: ['./first-block.component.css']  
})

export class FirstBlockComponent implements OnInit {
  
  h1:any; // Заголовок h1
  modal_switcher: boolean; // Свитчер включения окна с формой  

  constructor(private getjsonService: GetJsonService, private formsService: FormsService) { }

  // Обрабатываем клики для открытия формы firstForm в модальном окне
  openFormClick(openClick: ClickForm) {
    this.formsService.openForm(openClick);
  }

  ngOnInit() {
    // Получаем значение для заголовка h1 из json файла
    this.getjsonService.getPagesJson()
    .subscribe(
      data => this.h1=data["index"][0]["h1"],
      error => console.log(error)
    );
  }

}
