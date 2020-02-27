import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Title, Meta } from '@angular/platform-browser';

// Для обработки конструкции script-hack в SubscribeBlockComponent:
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  let title: Title;
  let meta: Meta;
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

  it(`should have a metatag charset=UTF-8`, () => {
    meta = TestBed.get(Meta);
    expect(meta.getTag('charset=UTF-8')).toBeDefined();
  });
  
});
