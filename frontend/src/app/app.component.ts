import { Component } from '@angular/core'
import { ViewEncapsulation } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
 
  constructor (
    private title: Title, 
    private meta: Meta
  ) {
    this.title.setTitle('Кивиниеми - база рафтинга и активного отдыха. Лосево, Ленинградская область')
    this.meta.addTags([
      {name: 'decriptions', content: 'Активный отдых, рафтинг, аренда площадок и проведение корпоративных мероприятий в Лосево. Почувствуйте вкус лета!'},
      {name: 'keywords', content: 'активный отдых, база рафтинга, проведение мероприятий, аренда площадок'},
      {property: 'og:title', content: 'Кивиниеми - база рафтинга и активного отдыха. Почувствуй вкус лета!'},
      {property: 'og:description', content: 'Активный отдых, рафтинг, аренда площадок и проведение корпоративных мероприятий в Лосево.'},
      {property: 'og:image', content: 'http://kiviniemi.ru/img/glavnaya/1.jpg'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '800'},            
      {property: 'og:url', content: 'http://kiviniemi.ru/'},
      {property: 'og:locale', content: 'ru_RU'},
      {property: 'og:site_name', content: 'Кивиниеми, база рафтинга'},
      {property: 'og:video', content: 'https://www.youtube.com/watch?v=LzkDYkvDnlI'},  
    ], true)
    
  }  

}
