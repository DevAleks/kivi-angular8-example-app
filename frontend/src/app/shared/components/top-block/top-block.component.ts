import { Component, HostListener, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common';
import { FormsService } from '../../services/forms.service'
import { ClickInterface } from '../../interfaces/interfaces'

@Component({
  selector: 'app-top-block',
  templateUrl: './top-block.component.html',
  styleUrls: ['./top-block.component.css']
})
export class TopBlockComponent {

  isNavToggle = false // Переключатель dropdown меню

  isOnScroll: boolean // Есть ли скрол вниз, да / нет

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default
    
  lazyLoad0 = '../../assets/img/logo.png' // Logo  

  constructor(
    private formsService: FormsService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  // Обрабатываем клики для открытия в модальном окне форм topForm, questionForm, callorderForm
  openFormClick(openClick: ClickInterface) {
    this.formsService.openForm(openClick)
  }

  // Устанавливаем в body стиль для блокировки прокрутки экрана
  isNavDropdown(isNavToggle: boolean) {
    if (isNavToggle) {
      this._document.body.classList.add('lock')
    } 
    else {
      this._document.body.classList.remove('lock')      
    }    
    isNavToggle = !isNavToggle
  }

  // Включаем / выключаем "раздвигание" верхнего десктопного меню
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop)
    if(pos > 1) {
      this.isOnScroll = true
    } else {
      this.isOnScroll = false      
    }     
  }

}
