import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Для обработки конструкции script-hack в SubscribeBlockComponent:
import { NO_ERRORS_SCHEMA } from '@angular/core'; 

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ AppComponent ],
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

  it(`should have as title 'kivi-app'`, () => {
    expect(comp.title).toEqual('kivi-app');
  });

});