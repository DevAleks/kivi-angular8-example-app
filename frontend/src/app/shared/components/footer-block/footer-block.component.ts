import { Component } from '@angular/core'
import { FormsService } from '../../services/forms.service'
import { ClickInt } from '../../interfaces/interfaces'

@Component({
  selector: 'app-footer-block',
  templateUrl: './footer-block.component.html',
  styleUrls: ['./footer-block.component.css']
})

export class FooterBlockComponent {

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default
    
  lazyLoad0 = '../../assets/img/logo.png' // Logo

  constructor(private formsService: FormsService) { }

  // Обрабатываем клики для открытия в модальном окне форм questionForm, callorderForm
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)
  }

}


