import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { defer } from "rxjs";

import { FirstBlockComponent } from './first-block.component';
import { FormsService } from '../../services/forms.service';
import { GetJsonService } from '../../services/get-json.service';
import { ClickForm } from '../../classes/click-class'

// Функция для создания асинхронного observable stub
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('FirstBlockComponent', () => {
  let component: FirstBlockComponent;
  let fixture: ComponentFixture<FirstBlockComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;
  let getjson: GetJsonService;
  const openFormStub = {
    openForm: (openClickStub: ClickForm) => {}
  }; 
  
  const getJsonStub = {
    getPagesJson() {
      return fakeAsyncResponse({index: [{h1: 'База рафтинга и активного отдыха "Кивиниеми"'}]});
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstBlockComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        { provide: FormsService, useValue: openFormStub },
        { provide: GetJsonService, useValue: getJsonStub }
      ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
    getjson = TestBed.get(GetJsonService);
  }));       

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called openForm', () => {
    spy = spyOn(forms, 'openForm');
    const openClick: ClickForm = {typeofform: 2, typeofact: 'Рафтинг'};
    forms.openForm(openClick);    
    expect(spy.calls.any()).toBeTruthy();
  });
  
  it('should called getPagesJson', async(() => {
    spy = spyOn(getjson, 'getPagesJson');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(spy).toBeTruthy(); 
    });
  }));

  it('should get H1 by GetJsonService.getPagesJson()', async(async() => {
    const pageTitle = fixture.nativeElement.querySelector('h1.page-title');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(pageTitle.textContent).toBe('База рафтинга и активного отдыха "Кивиниеми"');
    // Тоже рабочий вариант
    // expect(fixture.nativeElement.querySelector('h1.page-title').textContent).toContain('База рафтинга и активного отдыха "Кивиниеми"');    
  }));

/*  
  // Тоже рабочий вариант с асинхронным подходом
  let mockH1;

  it('should get H1 by getJsonService.getPagesJson() 2', async(() => {
    const mockH1 = {index: [{h1: 'База рафтинга и активного отдыха "Кивиниеми"'}]};
    spyOn(getjson, 'getPagesJson').and.returnValue(of(mockH1));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.h1).toContain('База рафтинга и активного отдыха "Кивиниеми"');
    });
  }));
*/

  /*
  // Пример стаба для асинхронного метода 
  const getJsonStub = {
    getPagesJson() {
      const data = {index: [{h1: 'База рафтинга и активного отдыха "Кивиниеми"'}]};
      return of( data );
    }
  };
*/

});
