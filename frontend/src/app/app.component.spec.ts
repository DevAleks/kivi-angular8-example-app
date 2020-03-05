import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, Meta } from '@angular/platform-browser';

// Для обработки конструкции script-hack в SubscribeBlockComponent:
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  let title: Title;
  let meta: Meta;
  let metatags: HTMLMetaElement[];
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ AppComponent ],
      providers: [
        { provide: Title, useClass: Title },
        { provide: Meta, useClass: Meta }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have as title 'Кивиниеми - база рафтинга и активного отдыха. Лосево, Ленинградская область'`, () => {
    title = TestBed.get(Title);
    expect(title.getTitle()).toBe("Кивиниеми - база рафтинга и активного отдыха. Лосево, Ленинградская область");
  });

  it(`should have a metatag name=keywords with content='активный отдых, база рафтинга, проведение мероприятий, аренда площадок'`, () => {
    meta = TestBed.get(Meta);
    expect(meta.getTag('name=keywords').content).toBe('активный отдых, база рафтинга, проведение мероприятий, аренда площадок');
  });

  it(`should have a metatag httpEquiv=X-UA-Compatible with content: 'IE=edge', title: '123'`, () => {
    metatags = TestBed.get(Meta).getTags('httpEquiv=X-UA-Compatible');
    metatags.forEach(el => {
      expect(el.content).toBe('IE=edge');
      expect(el.title).toBe('123');
    });
    
  });

});
