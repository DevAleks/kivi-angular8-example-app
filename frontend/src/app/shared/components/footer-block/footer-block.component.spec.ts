import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Для обработки конструкции script-hack в шаблоне FooterBlockComponent:
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

import { FooterBlockComponent } from './footer-block.component';
import { FormsService } from '../../services/forms.service';
import { ClickForm } from '../../classes/click-class'

describe('FooterBlockComponent', () => {
  let component: FooterBlockComponent;
  let fixture: ComponentFixture<FooterBlockComponent>;
  let forms: FormsService;
  let spy: jasmine.Spy;
  const openFormStub = {
    openForm: (openClickStub: ClickForm) => {}
  }; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterBlockComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ { provide: FormsService, useValue: openFormStub } ]
    })
    .compileComponents();
    forms = TestBed.get(FormsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should called openForm', () => {
    spy = spyOn(forms, 'openForm');
    const openClick: ClickForm = {typeOfForm: 2, typeOfAct: 'Рафтинг'};
    forms.openForm(openClick);    
    expect(spy.calls.any()).toBeTruthy();
  });
  
});
