import { Component } from '@angular/core'

@Component({
  selector: 'app-guides-block',
  templateUrl: './guides-block.component.html',
  styleUrls: ['./guides-block.component.css']
})
export class GuidesBlockComponent  { 

  // Images LazyLoader  
  defaultImage = '../../assets/img/img-ldr-wht-312px.svg' // Default
    
  lazyLoad1 = '../../assets/img/semak.jpg'

  lazyLoad2 = '../../assets/img/gribanov.jpg'

  lazyLoad3 = '../../assets/img/polianski.jpg'

  lazyLoad4 = '../../assets/img/gusev.jpg'
  
  lazyLoad5 = '../../assets/img/beliankina.jpg'
  
  lazyLoad6 = '../../assets/img/kiseleff.jpg'  

}
