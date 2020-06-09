import { Component } from '@angular/core'
import { FormsService } from '../../services/forms.service'
import { ClickInt } from '../../interfaces/interfaces'

@Component({
  selector: 'app-footer-block',
  templateUrl: './footer-block.component.html',
  styleUrls: ['./footer-block.component.css']
})

export class FooterBlockComponent {

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм questionForm, callorderForm
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)
  }

}


