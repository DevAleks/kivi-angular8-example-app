import { Component, HostListener, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-go-to-top',
  templateUrl: './go-to-top.component.html',
  styleUrls: ['./go-to-top.component.css']
})
export class GoToTopComponent {

  isOnScroll: boolean // Есть ли скрол вниз, да / нет

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  // Включаем / выключаем "раздвигание" верхнего десктопного меню
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop)
    if(pos > 100) {
      this.isOnScroll = true
    } else {
      this.isOnScroll = false      
    }     
  }

  goToTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });    
  }

}
