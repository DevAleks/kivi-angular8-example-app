import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from "rxjs";

// Для обработки pipe safe в шаблоне VideoBlockComponent:
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

// Pipes
import { SafePipe } from '../../pipes/safePipe';

import { VideoBlockComponent } from './video-block.component';
import { GetJsonService } from '../../services/get-json.service';

// Функция для создания асинхронного observable stub
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('VideoBlockComponent', () => {
  let component: VideoBlockComponent;
  let fixture: ComponentFixture<VideoBlockComponent>;
  let getjson: GetJsonService;
  let spy: jasmine.Spy;
  const getJsonStub = {
    getPagesJson() {
      return fakeAsyncResponse({index: [{videoUrl: "https://www.youtube.com/embed/LzkDYkvDnlI"}]});
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoBlockComponent, SafePipe ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: GetJsonService, useValue: getJsonStub } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
    getjson = TestBed.get(GetJsonService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called getPagesJson', async(() => {
    spy = spyOn(getjson, 'getPagesJson');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy).toBeTruthy(); 
    });
  }));

  it('should get Url by GetJsonService.getPagesJson()', async(async() => {
    const iframeElem = fixture.nativeElement.querySelector('iframe.inner');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(iframeElem.src).toBe('https://www.youtube.com/embed/LzkDYkvDnlI');  
  }));
  
});
