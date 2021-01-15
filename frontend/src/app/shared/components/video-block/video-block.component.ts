import { Component, OnInit } from '@angular/core'
import { ViewEncapsulation } from '@angular/core'

import { GetJsonService } from '../../services/get-json.service'
import { JsonObject } from '../../interfaces/interfaces'

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class VideoBlockComponent implements OnInit {

  videoUrl: string // why any?
  error: string // why any? - this variable is never used
  isVideoLoading = false

  constructor(
    private getJsonService: GetJsonService,
  ) { }

  ngOnInit() {
    this.isVideoLoading = true // включаем отображение лоадера на время загрузки видео
    // Получаем url видео из JSON файла
    this.getJsonService.getPagesJson()
      .subscribe((jsonObject: JsonObject[]) => {
        this.videoUrl = jsonObject["index"][0]["videoUrl"]
        this.isVideoLoading = false
      },
        error => { this.error = error }
      )
  }

}
