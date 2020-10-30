import { Component, OnInit } from '@angular/core'
import { ViewEncapsulation } from '@angular/core'

import { GetJsonService } from '../../services/get-json.service'
import { JsonInt } from '../../interfaces/interfaces'

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoBlockComponent implements OnInit {

  videourl: any

  error: any

  videoLoader = false
 
  constructor(
    private getjsonService: GetJsonService,
    ) { }

  ngOnInit() {    
    this.videoLoader = true // включаем отображение лоадера на время загрузки видео
    // Получаем url видео из JSON файла
    this.getjsonService.getPagesJson().subscribe(
      (data:JsonInt[]) => {
        this.videourl = data["index"][0]["videoUrl"],
        this.videoLoader = false
      }, 
      error => { this.error = error }
    )
  }

}
