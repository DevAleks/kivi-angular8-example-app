import { Component, OnInit } from '@angular/core';
import { GetJsonService } from '../../services/get-json.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-video-block',
  templateUrl: './video-block.component.html',
  styleUrls: ['./video-block.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoBlockComponent implements OnInit {

  videourl:any; 
  error:any;

  constructor(private getjsonService: GetJsonService) { }

  ngOnInit() {
    // Получаем url видео из файла json
    this.getjsonService.getPagesJson().subscribe(
      data => this.videourl=data["index"][0]["videoUrl"],
      error => this.error = error
    );
  }

}
