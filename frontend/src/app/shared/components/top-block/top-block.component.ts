import { Component, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { FormsService } from '../../services/forms.service'
import { ClickInt } from '../../interfaces/interfaces'

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.css']
})
export class TopBlockComponent {

  isNavToggle = false // Переключатель состояния мобильного меню

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default
    
  lazyLoad0 = '../../assets/img/logo.png' // Logo  

  constructor(
    private formsService: FormsService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickInt) {
    this.formsService.openForm(openClick)
  }

  isNavDropdown (isNavToggle: boolean) {
    if (isNavToggle) {
      this._document.body.classList.add('lock')
      isNavToggle = !isNavToggle
    } else {
      this._document.body.classList.remove('lock')
      isNavToggle = !isNavToggle
    }
  }

}
